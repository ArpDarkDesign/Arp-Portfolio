import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Loader from "../components/Loader";
import Fox from "../models/Fox";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  BrightnessContrast,
  Outline,
  DepthOfField,
  Sepia,
} from "@react-three/postprocessing";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Rain = () => {
  const raindrops = useRef([]);

  useFrame(() => {
    raindrops.current.forEach((raindrop) => {
      if (raindrop.position.y > -2) {
        raindrop.position.y -= 0.02;
      } else {
        raindrop.position.y = 5;
      }
    });
  });

  return (
    <>
      {Array.from({ length: 150 }, (_, index) => (
        <mesh
          key={index}
          ref={(ref) => (raindrops.current[index] = ref)}
          position={[
            Math.random() * 15 - 5,
            Math.random() * 5,
            Math.random() * 30 - 15,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 80]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </>
  );
};

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const validateForm = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required.";
    }

    if (!form.message.trim()) {
      errors.message = "Message is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Anonymous",
          from_email: form.email,
          to_email: "theanonymousophere@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSuccessMessage("Message sent successfully!");
        setTimeout(() => {
          setCurrentAnimation("idle");
          setForm({
            name: "",
            email: "",
            message: "",
          });
          setSuccessMessage("");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Oops! Something went wrong. Message not sent.");
        console.error(error);
      });
  };

  const PostProcessingEffects = () => {
    return (
      <EffectComposer>
        {/* Bloom Effect */}
        <Bloom
          luminanceThreshold={-500}
          luminanceSmoothing={2}
          intensity={-5}
        />

        {
          /* Vignette Effect */
          <Vignette eskil={false} offset={-1} darkness={-9} />
        }

        {/* Noise Effect */}
        <Noise opacity={-100} />
        <Sepia intensity={0.1} />

        {/* Brightness/Contrast Effect */}
        <BrightnessContrast brightness={-10} contrast={-0.1} />

        <Outline color="#ffffff" thickness={-100} />
        <DepthOfField
          focusDistance={0}
          focalLength={-10}
          bokehScale={-9}
          height={-408}
        />
      </EffectComposer>
    );
  };

  return (
    <motion.section
      className="relative flex lg:flex-row flex-col min-h-screen bg-gradient-to-r from-black to-gray-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="lg:w-1/2 w-full lg:h-auto -[550px] h-[350px]  relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("./src/pages/op.jpg")' }}
        ></div>
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight position={[-0.1, -50, -5]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[-5, 10, 5]} intensity={1} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.5}
            penumbra={1}
            intensity={2}
          />
          {/* <PostProcessingEffects /> */}
          <fog attach="fog" args={["#222", 1, 10]} />
          <Rain count={5000} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[1.5, 0.5, 250]}
              rotation={[12.629, -0.9, 0]}
              scale={[0.7, 0.7, 0.7]}
            />
          </Suspense>
        </Canvas>
      </div>

      <motion.div className="flex-1 flex flex-col p-20 z-0 justify-center items-center h-full">
        <motion.h1
          className="head-text text-5xl font-bold mb-8 text-red-500 uppercase tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ☠️ Begin The Ritual...
        </motion.h1>

        {Object.keys(formErrors).length > 0 && (
          <motion.p
            className="text-red-500 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Beware! The fields cannot be empty.
          </motion.p>
        )}
        {successMessage && (
          <motion.p
            className="text-green-500 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {successMessage}
          </motion.p>
        )}

        {errorMessage && (
          <motion.p
            className="text-red-500 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {errorMessage}
          </motion.p>
        )}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          <motion.label
            className="text-gray-300 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Name
            <motion.input
              type="text"
              name="name"
              className="input bg-gray-800 border-b-2 border-red-800 focus:border-red-700"
              placeholder="Enter your name..."
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              whileHover={{ scale: 1.05 }}
            />
            {formErrors.name && (
              <motion.p
                className="text-red-500 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {formErrors.name}
              </motion.p>
            )}
          </motion.label>
          <motion.label
            className="text-gray-300 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            Email
            <motion.input
              type="email"
              name="email"
              className="input bg-gray-800 border-b-2 border-red-800 focus:border-red-700"
              placeholder="Enter your email..."
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              whileHover={{ scale: 1.05 }}
            />
            {formErrors.email && (
              <motion.p
                className="text-red-500 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                {formErrors.email}
              </motion.p>
            )}
          </motion.label>
          <motion.label
            className="text-gray-300 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            Your Message
            <motion.textarea
              name="message"
              rows="4"
              className="textarea bg-gray-800 border-b-2 border-red-800 focus:border-red-700"
              placeholder="Enter your creative thoughts here..."
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              whileHover={{ scale: 1.05 }}
            />
            {formErrors.message && (
              <motion.p
                className="text-red-500 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                {formErrors.message}
              </motion.p>
            )}
          </motion.label>

          <motion.button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-gray-800 focus:outline-none focus:ring focus:border-red-500 transform
             transition-transform hover:scale-105 p-4 text-red-500 border-2 border-red-800 rounded shadow-lg font-semibold"
            onFocus={handleFocus}
            onBlur={handleBlur}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.05 }}
          >
            {loading ? (
              <motion.span whileHover={{ scale: 1.0 }}>
                Beware! Sending...
              </motion.span>
            ) : (
              <motion.span whileHover={{ scale: 1.0 }}>Summon</motion.span>
            )}
          </motion.button>
        </form>
        <div className="flex items-center justify-center space-x-4 mt-8">
          <a
            href="https://github.com/ArpDarkDesign/ArpDarkDesign"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
              size={24}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/arp-webnightmare-7242522b7/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
              size={24}
            />
          </a>
          {/* Add more icons for other social media platforms if needed */}
        </div>
      </motion.div>
    </motion.section>
  );
};
export default Contact;
