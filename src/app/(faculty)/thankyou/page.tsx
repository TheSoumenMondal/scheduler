"use client";

import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 relative overflow-hidden">
      {/* Left Yellow Triangle */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-yellow-500 clip-triangle-left"></div>
      {/* Right Green Triangle */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600 clip-triangle-right"></div>

      <div className="relative bg-white p-10 rounded-lg max-w-xl w-11/12 text-center shadow-lg">
        <h1 className="text-6xl">✅</h1>
        <h1 className="text-3xl font-bold mt-4">Thank You!</h1>
        <p className="text-gray-600 mt-2">
          We've sent your free report to your inbox for easy access. You can
          find more information on our website and social pages.
        </p>

        <div className="flex justify-center gap-5 mt-6">
          {/* Social Media Section */}
          <div className="p-6 bg-gray-100 rounded-lg text-center flex-1">
            <p className="font-bold text-xl mb-4">Connect With Us</p>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 text-2xl"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 text-2xl"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-red-500 hover:text-red-700 text-2xl">
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                className="text-blue-700 hover:text-blue-900 text-2xl"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Visit Website Section */}
          <div className="p-6 bg-gray-100 rounded-lg text-center flex-1">
            <p className="font-bold text-xl mb-4">Visit Our Website</p>
            <Link
              href={"/"}
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Visit Website
            </Link>
          </div>
        </div>
      </div>

      {/* Tailwind CSS clip-path styles */}
      
      <style jsx>{`
        .clip-triangle-left {
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }
        .clip-triangle-right {
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;
