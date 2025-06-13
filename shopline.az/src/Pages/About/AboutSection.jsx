import React from "react";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
    
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed space-y-4">
            Founded in 2023, Bazarly began with a simple mission: to make everyday shopping more convenient, affordable, and accessible for everyone. What started as a small online store has grown into a comprehensive marketplace serving thousands of customers.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We believe that shopping for essentials shouldn't be a hassle. That's why we've curated a wide selection of quality products from trusted brands, all available at competitive prices with fast, reliable delivery.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Today, Bazarly continues to evolve, always putting our customers first and striving to exceed expectations with every order.
          </p>
        </div>

    
        <div className="w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Bazarly Team"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
