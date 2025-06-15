import React, { useEffect, useState } from "react";
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
    description: "Fast and reliable delivery to your location",
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
  const [user, setUser] = useState(null);

  useEffect(() => {

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("İstifadəçi məlumatı tapılmadı. Zəhmət olmasa daxil olun.");
        return;
      }
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser || Object.keys(parsedUser).length === 0) {
        alert("İstifadəçi məlumatı düzgün deyil. Zəhmət olmasa yenidən daxil olun.");
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      alert("İstifadəçi məlumatı yüklənərkən xəta baş verdi.");
    }


    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/684f356639b70919105f02d0/1itqmh6pc";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);

   
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Comprehensive solutions for all your shopping needs.
        </p>
        <p className="mt-6 text-green-600 font-semibold">
          Xoş gəlmisiniz, {user.fullName || "İstifadəçi"}!
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
