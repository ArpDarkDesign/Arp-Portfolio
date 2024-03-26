import React, { useState } from "react";
import { Transition } from "react-transition-group";
import { FaTh, FaList } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Project.css";

const Projects = () => {
  const [showGrid, setShowGrid] = useState(true);

  const projectsList = [
    {
      title: "CrypticAnalyzer",
      description:
        "CrypticAnalyzer: Effortlessly convert text to upper and lower case, reverse it, or clear it with ease. Stay tuned for monthly updates, adding new features every 13th of the month. Explore on GitHub now!",
      image: "https://i.ibb.co/VNG1p2x/ss.png",
      githubRepo: "https://github.com/arpdarkdesign/CrypticAnalyzer",
      demoPage: "https://arpdarkdesign.github.io/CrypticAnalyzer/",
    },
    {
      title: "EduWav",
      description: "EduWav - Empowering education along with expertise!",
      image: "https://i.ibb.co/7VFdJPT/ss2.png",
      githubRepo: "https://github.com/ArpDarkDesign/EduWav",
      demoPage: "https://arpdarkdesign.github.io/EduWav/",
    },
    {
      title: "India's Rich History",
      description:
        "Journey through India's rich history with this interactive timeline web app.",
      image: "https://i.ibb.co/6Z4q0S8/ss3.png",
      githubRepo: "https://github.com/ArpDarkDesign/IndianHistory",
      demoPage: "https://arpdarkdesign.github.io/IndianHistory/",
    },
    {
      title: "GadgetLand",
      description: "GadgetLand - Your ultimate destination for all tech needs!",
      image: "https://i.ibb.co/XVgVHBT/ss4.png",
      githubRepo: "https://github.com/ArpDarkDesign/GadgetLand",
      demoPage: "https://arpdarkdesign.github.io/GadgetLand/",
    },
    {
      title: "ArpDanceAcademy",
      description:
        "Your digital stage for all things dance. Explore our vibrant website, featuring dynamic designs and interactive elements, perfect for showcasing the artistry of movement.",
      image: "https://i.ibb.co/HY7s1wf/ss5.png",
      githubRepo: "https://github.com/ArpDarkDesign/ArpDanceAcademy",
      demoPage: "https://arpdanceacademy.vercel.app/",
    },
  ];

  return (
    <motion.div
      className="bg-black text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="container mx-auto py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-semibold text-red-500 mb-8 spooky-short-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Arp's Chamber of Horrors
        </motion.h2>
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <button
            className={`mx-2 px-4 py-2 rounded-md focus:outline-none ${
              showGrid ? "bg-purple-800 text-white" : "bg-black text-gray-400"
            }`}
            onClick={() => setShowGrid(true)}
            title="Grid View"
          >
            <FaTh className="inline-block mr-2" />
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-md focus:outline-none ${
              showGrid ? "bg-black text-gray-400" : "bg-purple-800 text-white"
            }`}
            onClick={() => setShowGrid(false)}
            title="Detailed View"
          >
            <FaList className="inline-block mr-2" />
          </button>
        </motion.div>
        {showGrid ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {projectsList.map((project, index) => (
              <Transition key={index} in={true} timeout={500}>
                {(state) => (
                  <motion.div
                    className={`transform transition-all duration-500 ease-in-out bg-gray-800 p-6 rounded-lg shadow-md ${
                      state === "entered" ? "scale-100" : "scale-0"
                    } ${
                      state === "exited" ? "hidden" : ""
                    } hover:bg-gray-700 hover:shadow-2xl spooky-card`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <a
                      href={project.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={project.image}
                        alt={`Project ${index + 1}`}
                        className="mb-4 rounded-md w-full h-32 object-cover"
                      />
                    </a>
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <a
                      href={project.demoPage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600"
                    >
                      View Demo
                    </a>
                  </motion.div>
                )}
              </Transition>
            ))}
          </motion.div>
        ) : (
          <div>
            {projectsList.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 mb-8 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-2xl spooky-card"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex justify-between">
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600"
                  >
                    GitHub Repo
                  </a>
                  <a
                    href={project.demoPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600"
                  >
                    View Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Horrific Collaboration Section */}
      <motion.div
        className="bg-gray-900 p-4 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <h2 className="text-3xl font-semibold text-red-500 mb-2 spooky-short-title">
          Collaborate in Horror
        </h2>
        <p className="text-gray-400 mb-2">
          Are you drawn to the darkness? Join forces with Arp to create even
          more terrifying websites. Let's bring nightmares to life!
        </p>
        <a href="/contact" className="inline-block mb-4">
          <motion.button
            className="bg-red-600 text-white px-8 py-3 rounded-lg focus:outline-none transform transition-all duration-500 hover:scale-105 hover:bg-red-700 spooky-button"
            whileHover={{ scale: 1.05 }}
          >
            Contact Arp
          </motion.button>
        </a>
      </motion.div>

      <div className="bg-black p-8 text-center">
        <motion.p
          className="text-lg font-bold text-red-600 mb-4 spooky-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
        >
          Beware! Arp's Domain of Terror
        </motion.p>
        <motion.p
          className="text-sm text-gray-400 spooky-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.2 }}
        >
          &copy; 2024 Arp | Master of Shadows and Web Necromancy
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Projects;
