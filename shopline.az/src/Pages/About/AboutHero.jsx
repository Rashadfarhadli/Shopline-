import React from "react";

export default function AboutHero() {
  return (
    <section
      className="relative h-[70vh] flex items-center justify-center
        bg-gradient-to-r from-indigo-600 via-indigo-900 to-black"
    >
      <div className="relative text-center text-white px-4 sm:px-6 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
          About Shopline
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-medium mb-6 sm:mb-9 drop-shadow-lg">
          Your trusted partner in online shopping, bringing quality products and exceptional service to your doorstep.
        </p>

      </div>
    </section>
  );
}