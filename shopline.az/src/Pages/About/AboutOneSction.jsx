import React from "react";
import {
  FaBullseye,
  FaStar,
  FaHandsHelping,
  FaUsers,
} from "react-icons/fa";

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

export default function HomeOneSection() {
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          icon={<FaBullseye />}
          title="Our Mission"
          description="To provide convenient, affordable access to quality everyday essentials for everyone."
        />
        <Card
          icon={<FaStar />}
          title="Quality First"
          description="We carefully select products from trusted brands to ensure the highest quality standards."
        />
        <Card
          icon={<FaHandsHelping />}
          title="Customer Care"
          description="Your satisfaction is our priority. We're here to help every step of the way."
        />
        <Card
          icon={<FaUsers />}
          title="Community"
          description="Building strong relationships with our customers and supporting local communities."
        />
      </div>
    </section>
  );
}
