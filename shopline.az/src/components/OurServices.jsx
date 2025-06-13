import React from "react";
import {
  FaShoppingCart,
  FaShippingFast,
  FaCheckCircle,
  FaHeadphonesAlt,
} from "react-icons/fa";

const services = [
  {
    icon: <FaShoppingCart className="text-indigo-600 text-5xl mb-3" />,
    title: "Easy Shopping",
    description: "Browse and shop with our user-friendly interface.",
  },
  {
    icon: <FaShippingFast className="text-indigo-600 text-5xl mb-3" />,
    title: "Quick Delivery",
    description: "FFast and reliable delivery to your location",
  },
  {
    icon: <FaCheckCircle className="text-indigo-600 text-5xl mb-3" />,
    title: "Quality Products",
    description: "Only the best quality products for our customers",
  },
  {
    icon: <FaHeadphonesAlt className="text-indigo-600 text-5xl mb-3" />,
    title: "Customer Care",
    description: "Dedicated support for all your needs.",
  },
];

export default function OurServices() {
  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Comprehensive solutions for all your shopping needs.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-4"
          >
            {service.icon}
            <h3 className="text-lg font-semibold text-gray-700">
              {service.title}
            </h3>
            <p className="text-gray-500 text-sm mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
