import React from "react";

export default function Hero() {
  return (
    <section
      className="relative h-[70vh] flex items-center justify-center
        bg-gradient-to-r from-indigo-600 via-indigo-900 to-black"
    >
      <div className="relative text-center text-white px-4 sm:px-6 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
          Welcome to Shopline
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-medium mb-6 sm:mb-9 drop-shadow-lg">
          Your one-stop online marketplace for everyday essentials.
          From beverages to hygiene products, we've got everything you need.
        </p>

        <div className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0">
          <a
            href="/products"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-lg font-semibold shadow-lg transition text-center"
          >
            Shop Now
          </a>
          <a
            href="/about"
            className="px-6 py-3 border-2 border-white hover:border-indigo-400 rounded text-lg font-semibold shadow-lg transition text-center"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
