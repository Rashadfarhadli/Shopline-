import React from "react";

const stats = [
  {
    number: "10,000+",
    label: "Happy Customers",
  },
  {
    number: "500+",
    label: "Products Available",
  },
  {
    number: "50+",
    label: "Cities Served",
  },
  {
    number: "99.9%",
    label: "Uptime Guarantee",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 via-Blue-700 to-blue-600 text-white">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Bazarly by the Numbers</h2>
        <p className="text-lg sm:text-xl opacity-90">
          Our growth reflects the trust our customers place in us.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-lg p-6 hover:bg-white/20 transition duration-300 "
          >
            <h3 className="text-4xl font-bold mb-2">{item.number}</h3>
            <p className="text-lg font-medium opacity-90">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
