import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactSectionForm() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
      
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <textarea
              rows="5"
              placeholder="Message"
              className="w-full p-3 border border-gray-300 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

       
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our products or services? We're here to help!
            Reach out to us through any of the following channels.
          </p>

          <div className="space-y-6 text-gray-700">
        
            <div>
              <div className="flex items-center mb-1 text-indigo-600 font-semibold">
                <FaEnvelope className="mr-2" />
                Email Us
              </div>
              <p className="ml-6">www.Shopline.com</p>
              <p className="ml-6">support@shopline.com</p>
            </div>

           
            <div>
              <div className="flex items-center mb-1 text-indigo-600 font-semibold">
                <FaPhone className="mr-2" />
                Call Us
              </div>
              <p className="ml-6">+994 (051) 726-89-34</p>
              <p className="ml-6">+994 (051) 726-89-34</p>
            </div>

          
            <div>
              <div className="flex items-center mb-1 text-indigo-600 font-semibold">
                <FaMapMarkerAlt className="mr-2" />
                Visit Us
              </div>
              <p className="ml-6">123 Commerce Street</p>
              <p className="ml-6">Business District</p>
              <p className="ml-6">New York, NY 10001</p>
            </div>

          
            <div>
              <div className="flex items-center mb-1 text-indigo-600 font-semibold">
                <FaClock className="mr-2" />
                Business Hours
              </div>
              <p className="ml-6">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="ml-6">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="ml-6">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
