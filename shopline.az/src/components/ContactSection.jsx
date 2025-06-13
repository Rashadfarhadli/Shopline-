import React from "react";

export default function ContactSection() {
  return (
    <section
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-r from-indigo-500 to-blue-600"
    >
      <div className="text-white max-w-2xl">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Ready to Start Shopping?
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
          Join thousands of satisfied customers and discover the convenience of shopping with Shopline.
        </p>
        <a
          href="/register"
          className="block w-full sm:w-auto bg-white text-indigo-600 font-semibold px-6 py-3 rounded shadow-md hover:bg-gray-100 transition mx-auto"
        >
          Get Started Today
        </a>
      </div>
    </section>
  );
}
