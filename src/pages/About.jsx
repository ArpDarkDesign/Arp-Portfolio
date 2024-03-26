import React, { useEffect } from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3,
  FaNode,
  FaBootstrap,
  FaJs,
  FaGit,
  FaGithub,
  FaDatabase,
  FaLinkedin,
} from "react-icons/fa";
import profileImage from "../imp/images/tp.jpg";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  useEffect(() => {
    // Function to create a red raindrop
    const createRedRaindrop = () => {
      const redRaindrop = document.createElement("div");
      redRaindrop.className = "red-raindrop";
      redRaindrop.style.left = `${Math.random() * window.innerWidth}px`;
      redRaindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
      document.body.appendChild(redRaindrop);

      // Remove the red raindrop from the DOM after animation
      redRaindrop.addEventListener("animationend", () => {
        redRaindrop.remove();
      });
    };

    // Create red raindrops at intervals
    const redRainfallInterval = setInterval(createRedRaindrop, 300);

    // Clear interval on component unmount
    return () => clearInterval(redRainfallInterval);
  }, []);

  useEffect(() => {
    // Additional parallax effect on profile image
    const profileImageElement = document.querySelector(".profile-image");
    const handleScroll = () => {
      const scrollY = window.scrollY;
      profileImageElement.style.transform = `translate3d(0, ${
        scrollY * 0.5
      }px, 0)`;
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Corrected dependencies array

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 text-white p-4 md:p-8 font-horror  ">
      <div className="flicker-bg  " />
      <div className="flex-shrink-0 w-72 h-72 overflow-hidden rounded-full border-2 border-purple-500 mx-auto mt-12 md:ml-0 md:mt-0 mb-10 ">
        <motion.img
          src={profileImage}
          alt="Profile"
          className="object-cover w-full h-full rounded-full border-4 border-purple-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      <div className="max-w-2xl mx-auto mt-8 md:mt-0 relative top-[-18rem] eerie-glow ">
        <motion.h1
          className="text-4xl font-bold mb-4 text-red-600  "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Dark Sorcerer's Lair
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300  "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Unleashing sinister spells since March 2023, I am a Dark Sorcerer
          weaving nightmarish websites. Step into the abyss of web development,
          where shadows whisper in the code.
        </motion.p>
        <motion.p
          className="text-lg mt-4 text-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Specializing in the occult practices of
          <FaReact className="inline-block text-4xl text-yellow-400 mx-2 " />
          <FaHtml5 className="inline-block text-4xl text-red-400 mx-2" />
          <FaCss3 className="inline-block text-4xl text-green-400 mx-2" />
          <FaNode className="inline-block text-4xl text-indigo-400 mx-2" />
          <FaBootstrap className="inline-block text-4xl text-blue-500 mx-2" />
          <FaJs className="inline-block text-4xl text-yellow-300 mx-2" />
          <FaGit className="inline-block text-4xl text-red-600 mx-2" />
          <FaDatabase className="inline-block text-4xl text-green-500 mx-2" />
          <a
            href="https://github.com/ArpDarkDesign/ArpDarkDesign"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link "
          >
            <FaGithub className="inline-block text-4xl text-gray-400 mx-2" />
          </a>
          <a
            href="https://www.linkedin.com/in/arp-webnightmare-7242522b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <FaLinkedin className="inline-block text-4xl text-blue-600 mx-2" />
          </a>
          and other dark UI tools. Seeking souls for new dark contracts.
        </motion.p>
      </div>

      <div className="relative top-[-10rem]">
        {/* ... Your existing project sections above ... */}
        <div className="border-t-2 border-red-800 p-4 ">
          <motion.h2
            className="text-3xl font-bold text-red-500 mb-4 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <a href="/projects">Enigmatic Features</a>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Embark on a journey into the unknown with our mystifying features
            that will send chills down your spine.
          </motion.p>
        </div>

        <div className="border-t-2 border-red-800 p-4">
          <motion.h2
            className="text-3xl font-bold text-red-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <a href="/"> Shadowy Portfolio with three.js</a>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            Delve into my portfolio, revealing eerie web projects and haunting
            code snippets, enhanced with captivating three.js effects.
          </motion.p>
        </div>

        <div className="border-t-2 border-red-800 p-4">
          <motion.h2
            className="text-3xl font-bold text-red-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <a href="/contact">Occult Contact</a>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            Ready to immerse yourself in the abyss? Reach out to me for all your
            dark web development needs.
          </motion.p>
        </div>
      </div>

      <div className="bg-black p-8 text-center eerie-glow  ">
        <motion.p
          className="text-lg font-bold text-red-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          Beware! Arp's Domain of Terror
        </motion.p>
        <motion.p
          className="text-sm text-gray-400 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          &copy; 2024 Arp | Master of Shadows and Web Necromancy
        </motion.p>
      </div>
    </div>
  );
};

export default About;
