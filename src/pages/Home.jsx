import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  BrightnessContrast,
  Outline,
} from "@react-three/postprocessing";
import {
  faMountain,
  faVolumeUp,
  faVolumeMute,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";

const LABEL_STYLE = "text-white font-bold text-xl tracking-wide";
const LABEL_HOVER_STYLE =
  "transition-transform duration-300 block mx-auto px-6 py-3 rounded-full transform scale-100 hover:scale-110";

const POPUP_MESSAGES = [
  {
    message: `<div class="text-center bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-lg transform hover:-translate-y-2 transition-transform duration-500 >
      <span class="${LABEL_STYLE} text-2xl">Greetings from the Shadows!</span><br>
      I am <span class="text-red-500 font-semibold"><a href="https://www.linkedin.com/in/arp-webnightmare-7242522b7/" target="_blank" rel="noopener noreferrer">Arp</a></span>, the <span class="text-indigo-600 font-bold">React CraftsMan</span>.<br>
      <span class="text-purple-700 font-bold text-lg">Welcome to my Cryptic Realm of Eternal Shadows!</span>
    </div>`,
    link: null,
    animation: {
      opacity: 0,
      y: -20,
      scale: 0.5,
      fadeIn: { opacity: 1, y: 0, scale: 1, duration: 800, ease: "ease-out" },
    },
  },

  {
    message: `<div class="text-center bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-lg transform hover:rotate-2 transition-transform duration-500">
      <span class="${LABEL_STYLE} text-2xl">Embark on a Mesmerizing Journey</span><br>
      through enchanting designs,<br>where shadows dance with creativity.
    </div>`,
    link: {
      label: "Explore",
      to: "/projects",
      className: `${LABEL_STYLE} ${LABEL_HOVER_STYLE} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:rotate-3`,
      animation: {
        slideInLeft: { x: "-100%" },
        fadeIn: { x: 0, duration: 800, ease: "ease-out" },
      },
    },
  },

  {
    message: `<div class="text-center bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-lg transform transition-transform duration-500 hover:translate-y-1 scale-110">
      <span class="${LABEL_STYLE} text-2xl">Summon me for Unearthly Collaborations</span><br>
      and witness your darkest visions materialize!
    </div>`,
    link: {
      label: "Contact",
      to: "/contact",
      className: `${LABEL_STYLE} ${LABEL_HOVER_STYLE} bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-110`,
      animation: {
        slideInRight: { x: "100%" },
        fadeIn: { x: 0, duration: 800, ease: "ease-out" },
      },
    },
  },

  {
    message: `<div class="text-center bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-lg transform hover:rotate-12 transition-transform duration-500 hover:rotate-8">
      <span class="${LABEL_STYLE} text-2xl">Witness Diabolical Innovation Unveiled</span><br>
      in the intricate dance of design and technology.<br>Every pixel harbors malevolent secrets.
    </div>`,
    link: {
      label: "Discover",
      to: "/about",
      className: `${LABEL_STYLE} ${LABEL_HOVER_STYLE} bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:rotate-3`,
      animation: {
        zoomIn: { scale: 0, duration: 800, ease: "ease-out" },
        fadeIn: { scale: 1 },
      },
    },
  },

  {
    message: `<div class="text-center bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-lg transform hover:flip-x transition-transform duration-500 hover:flip-y">
      <span class="${LABEL_STYLE} text-2xl">Craft Digital Malevolence Together</span><br>
      and plunge into the abyss of haunting nightmares!
    </div>`,
    link: {
      label: "Begin the Ritual",
      to: "/contact",
      className: `${LABEL_STYLE} ${LABEL_HOVER_STYLE} bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:-rotate-3`,
      animation: {
        flipInX: { rotateX: 360, duration: 800, ease: "ease-out" },
        fadeIn: { rotateX: 0 },
      },
    },
  },
];

const POPUP_DURATION = 3000;
const POPUP_INTERVAL = 5000;
const INITIAL_DELAY = 4000;

const adjustIslandForScreenSize = () => {
  const screenPosition = [0, -6.5, -43];
  const rotation = [0.1, 4.7, 0];
  let screenScale = [1, 1, 1];

  if (window.innerWidth < 768) {
    screenScale = [0.9, 0.9, 0.9];
  }

  return [screenScale, screenPosition, rotation];
};

const Home = () => {
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const [popupContent, setPopupContent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [islandPaused, setIslandPaused] = useState(false);
  const [audio] = useState(new Audio("../src/imp/op.mp3"));
  const [audioPlaying, setAudioPlaying] = useState(false);
  const navigate = useNavigate();
  const islandControls = useAnimation(); // Create an instance of useAnimation

  const handleIslandPause = () => {
    setIslandPaused(!islandPaused);
  };

  const handleAudioToggle = () => {
    if (audioPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  useEffect(() => {
    let currentIndex = 0;

    const showPopupFunction = async () => {
      setPopupContent(POPUP_MESSAGES[currentIndex]);

      console.log(`Displaying message at index: ${currentIndex}`);

      setShowPopup(true);

      await new Promise((resolve) => setTimeout(resolve, POPUP_DURATION));

      setShowPopup(false);

      currentIndex = (currentIndex + 1) % POPUP_MESSAGES.length;
    };

    const intervalId = setInterval(showPopupFunction, POPUP_INTERVAL);

    setTimeout(() => {
      showPopupFunction();
    }, INITIAL_DELAY);

    return () => {
      clearInterval(intervalId);
      audio.pause();
    };
  }, [audio]);

  const handleMouseMove = (e) => {
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      islandControls.start({ position: [x, y, -43] });
      birdControls.start({ position: [x, y, -43] });
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [islandControls]);

  const PostProcessingEffects = () => {
    return (
      <EffectComposer>
        {/* Bloom Effect */}
        <Bloom
          luminanceThreshold={-3}
          luminanceSmoothing={-1}
          intensity={-0.2}
        />

        {/* Vignette Effect */}
        <Vignette eskil={false} offset={0.1} darkness={-1} />

        {/* Noise Effect */}
        <Noise opacity={-9} />

        {/* Brightness/Contrast Effect */}
        <BrightnessContrast brightness={-0.6} contrast={0.7} />

        <Outline color="#0088ff" thickness={0.1} />
      </EffectComposer>
    );
  };

  // const [isBirdVisible, setIsBirdVisible] = useState(false);

  const [birdControls] = useState(useAnimation());

  const [birdMessageVisible, setBirdMessageVisible] = useState(false);
  const [birdGoneMessageVisible, setBirdGoneMessageVisible] = useState(false);

  const [isBirdVisible, setIsBirdVisible] = useState(false);

  const handleToggleBird = () => {
    if (!isBirdVisible) {
      // Show the "The bird is coming!" message
      setBirdMessageVisible(true);

      // Hide the message after a certain duration (e.g., 2000 milliseconds)
      setTimeout(() => {
        setBirdMessageVisible(false);
      }, 2000);
    } else {
      // Show the "The bird's gone!" message
      setBirdGoneMessageVisible(true);

      // Hide the message after a certain duration (e.g., 2000 milliseconds)
      setTimeout(() => {
        setBirdGoneMessageVisible(false);
      }, 1000);
    }

    // Toggle the bird visibility
    setIsBirdVisible(!isBirdVisible);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen relative bg-gray-900 text-white flex flex-col justify-between"
    >
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[10, 50, -3]} intensity={1.25} />
          <ambientLight intensity={2.5} />
          <hemisphereLight
            skycolor="#000000"
            groundColor="black"
            intensity={3}
          />
          <PostProcessingEffects />

          {isBirdVisible && (
            <motion.group animate={birdControls}>
              <Bird />
            </motion.group>
          )}

          <motion.group animate={islandControls}>
            <Island
              position={islandPosition}
              scale={islandScale}
              rotation={islandRotation}
              paused={islandPaused}
            />
          </motion.group>

          <Sky />
        </Suspense>
      </Canvas>
      <div
        className={`absolute ${
          window.innerWidth < 1000 ? "bottom-4 left-4" : "top-4 left-4"
        }`}
      >
        <motion.button
          onClick={handleIslandPause}
          className={`p-2 bg-gray-800 text-white rounded-full shadow-md ${
            islandPaused ? "cross" : ""
          }`}
          whileHover={{
            scale: 1.2,
            rotate: islandPaused ? 0 : 10,
            boxShadow: "0px 0px 20px rgba(0, 255, 0, 0.8)",
            textShadow: "0px 0px 10px rgba(0, 255, 0, 0.5)",
            filter: "hue-rotate(90deg)",
          }}
          whileTap={{
            scale: 0.9,
            rotate: -10,
            boxShadow: "0px 0px 5px rgba(0, 255, 0, 0.8)",
          }}
          drag
          dragConstraints={{
            left: 0,
            right: window.innerWidth - 50,
            top: 0,
            bottom: window.innerHeight - 50,
          }}
          initial={{ opacity: 0, y: -20, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1, color: "#ff0000" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {islandPaused ? (
            <FontAwesomeIcon icon={faTimes} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faMountain} size="2x" />
          )}
        </motion.button>
      </div>

      {birdMessageVisible && (
        <motion.div
          className={`fixed ${
            window.innerWidth < 1000
              ? "bottom-2 left-1/2 transform -translate-x-1/2"
              : "bottom-4 left-1/2 transform -translate-x-1/2"
          } bg-gray-800 p-3 rounded-md text-white`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "#2C3E50" }}
          whileTap={{ scale: 0.9, backgroundColor: "#34495E" }}
        >
          <p>Guess what's soaring your way? 🤔</p>
        </motion.div>
      )}

      {birdGoneMessageVisible && (
        <motion.div
          className={`fixed ${
            window.innerWidth < 1000
              ? "bottom-1 left-1/2 transform -translate-x-1/2"
              : "bottom-4 left-1/2 transform -translate-x-1/2"
          } bg-gray-800 p-3 rounded-md text-white`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <p>Vanished in a flash! 🚀✨</p>
        </motion.div>
      )}

      <div
        className={`absolute ${
          window.innerWidth < 1000
            ? "top-24 right-4" // Adjust the top value to move it lower
            : "top-1/2 right-7 transform translate-y-1/2 translate-x-1/2"
        }`}
      >
        {window.innerWidth >= 950 && (
          <Tooltip
            title={isBirdVisible ? "🌟 Disappear" : "🪄 Reveal"}
            position={window.innerWidth < 1000 ? "top" : "right"}
            arrow={true}
            animation="scale"
            trigger="mouseenter"
          >
            <motion.button
              onClick={() => {
                handleToggleBird();
              }}
              className="p-2 bg-gray-800 text-white rounded-full shadow-md"
              whileHover={{
                scale: 1.2,
                rotate: isBirdVisible ? 10 : 0,
                boxShadow: "0px 0px 20px rgba(255, 0, 0, 0.8)",
                textShadow: "0px 0px 10px rgba(255, 0, 0, 0.5)",
                filter: "hue-rotate(90deg)",
              }}
              whileTap={{
                scale: 0.9,
                rotate: isBirdVisible ? -10 : 0,
                boxShadow: "0px 0px 5px rgba(255, 0, 0, 0.8)",
              }}
              initial={{ opacity: 0, y: -20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1, color: "#ff0000" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isBirdVisible ? (
                <motion.div whileTap={{ scale: 0.9 }}>
                  <FontAwesomeIcon icon={faTimes} size="1x" />
                </motion.div>
              ) : (
                <motion.div whileTap={{ scale: 0.9 }}>
                  <span role="img" aria-label="bird">
                    🦜
                  </span>
                </motion.div>
              )}
            </motion.button>
          </Tooltip>
        )}
        {window.innerWidth < 950 && (
          <motion.button
            onClick={() => {
              handleToggleBird();
            }}
            className="p-2 bg-gray-800 text-white rounded-full shadow-md"
            whileHover={{
              scale: 1.2,
              rotate: isBirdVisible ? 10 : 0,
              boxShadow: "0px 0px 20px rgba(255, 0, 0, 0.8)",
              textShadow: "0px 0px 10px rgba(255, 0, 0, 0.5)",
              filter: "hue-rotate(90deg)",
            }}
            whileTap={{
              scale: 0.9,
              rotate: isBirdVisible ? -10 : 0,
              boxShadow: "0px 0px 5px rgba(255, 0, 0, 0.8)",
            }}
            initial={{ opacity: 0, y: -20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1, color: "#ff0000" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isBirdVisible ? (
              <motion.div whileTap={{ scale: 0.9 }}>
                <FontAwesomeIcon icon={faTimes} size="1x" />
              </motion.div>
            ) : (
              <motion.div whileTap={{ scale: 0.9 }}>
                <span role="img" aria-label="bird">
                  🦜
                </span>
              </motion.div>
            )}
          </motion.button>
        )}
      </div>

      <div className="absolute bottom-4 right-4">
        <motion.button
          onClick={handleAudioToggle}
          className="p-1.5 bg-gray-800 text-white rounded-full shadow-md"
          initial={{ opacity: 0, y: -20, scale: 0.5 }} // Add scale for bouncing effect
          animate={{ opacity: 1, y: 0, scale: 1 }} // Add scale for bouncing effect
          whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "#2C3E50" }}
          whileTap={{ scale: 0.9, backgroundColor: "#34495E" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {audioPlaying ? (
            <FontAwesomeIcon icon={faVolumeUp} size="1x" />
          ) : (
            <FontAwesomeIcon icon={faVolumeMute} size="1x" />
          )}
        </motion.button>
      </div>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="fixed top-1/2 left-0 transform -translate-y-1/2 ml-4 bg-gray-800 p-6 rounded-lg shadow-lg z-50 transition-opacity duration-500 popup"
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            dangerouslySetInnerHTML={{ __html: popupContent.message }}
            className="text-xl font-semibold text-white"
          ></motion.p>

          {popupContent.link && (
            <Link
              to={popupContent.link.to}
              className={`ml-4 text-lg font-semibold ${popupContent.link.className} transition-all duration-300`}
              whilehover={{
                scale: 1.1,
                color: "#4CAF50",
                rotate: 3,
                textShadow: "0px 0px 10px rgba(76, 175, 80, 1)",
              }}
            >
              <motion.span
                whilehover={{ rotate: 360, transition: { duration: 1 } }}
              >
                {popupContent.link.label}
              </motion.span>
            </Link>
          )}
        </motion.div>
      )}
    </motion.section>
  );
};
export default Home;
