import React from "react";

export default function FindUsSection() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Find Us</h2>
        <p className="text-gray-600 text-lg">
          Located in the heart of the business district, we're easy to find and visit.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <iframe
          title="Bazarly Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.0713061953948!2d49.60830664959867!3d40.47368747874564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40309bbe8b7637f3%3A0xb7f59b438a25cf77!2sMusfiqabad%20yeni%20qesebe!5e0!3m2!1sen!2saz!4v1749827818201!5m2!1sen!2saz"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg shadow-md"
        ></iframe>
      </div>
    </section>
  );
}
