import React from "react";
import { motion } from "framer-motion";

const ThankYou: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Card Container with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center space-y-6"
      >
        {/* Animated Checkmark Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-green-500"
        >
          <svg
            className="w-24 h-24 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-gray-900">Thank You!</h1>

        {/* Subtext with Emotional Reinforcement */}
        <p className="text-lg text-gray-600 leading-relaxed">
          Your schedule has been successfully submitted. We truly appreciate
          your time and effort in organizing your schedule with us.
        </p>

        {/* Action Button with Hover Animation */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/"
          className="inline-block px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Explore More
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ThankYou;
