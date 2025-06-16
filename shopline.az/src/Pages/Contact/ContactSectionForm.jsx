import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Ad tam daxil edilməlidir"),
  email: Yup.string().email("Email düzgün deyil").required("Email tələb olunur"),
  subject: Yup.string().required("Mövzu daxil edilməlidir"),
  message: Yup.string().required("Mesaj daxil edilməlidir"),
});

export default function ContactSectionForm() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <ToastContainer />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
       
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              subject: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const user = localStorage.getItem("user");
              if (!user) {
                toast.error("Mesaj göndərmək üçün əvvəlcə sistemə daxil olun!");
                return;
              }

              try {
                const response = await fetch("http://localhost:5005/contacts", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });

                if (!response.ok) {
                  throw new Error("Mesaj göndərilmədi");
                }

                toast.success("Mesajınız uğurla göndərildi", {
                  autoClose: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });

                resetForm();
              } catch (error) {
                toast.error(error.message || "Xəta baş verdi");
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      className={`w-full p-3 border rounded ${
                        errors.fullName && touched.fullName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className={`w-full p-3 border rounded ${
                        errors.email && touched.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Field
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    className={`w-full p-3 border rounded ${
                      errors.subject && touched.subject ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    as="textarea"
                    name="message"
                    rows="5"
                    placeholder="Message"
                    className={`w-full p-3 border rounded ${
                      errors.message && touched.message ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-700 transition cursor-pointer"
                >
                  Send Message
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our products or services? We're here to help! Reach out to us
            through any of the following channels.
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
