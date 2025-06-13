import React from "react";
import { FaShippingFast, FaLock, FaHeadset } from "react-icons/fa";

function Card({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer">
      <div className="flex justify-center mb-4 text-indigo-600 text-5xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function OneSection() {
  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Why Choose Shopline?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          We're committed to providing you with the best shopping experience
          possible.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          icon={<FaShippingFast />}
          title="Fast Delivery"
          description="Get your products delivered swiftly and on time."
        />
        <Card
          icon={<FaLock />}
          title="Secure Shopping"
          description="Your personal data and payments are safe with us."
        />
        <Card
          icon={<FaHeadset />}
          title="24/7 Support"
          description="We’re here to help anytime you need assistance."
        />
      </div>
    </section>
  );
}
