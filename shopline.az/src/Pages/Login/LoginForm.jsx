import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Düzgün email daxil edin").required("Email boş ola bilməz"),
      password: Yup.string().min(4, "Minimum 4 simvol").required("Şifrə boş ola bilməz"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`http://localhost:5005/users`);
        const data = await res.json();

        const foundUser = data.find(
          (user) => user.email === values.email && user.password === values.password
        );

        if (foundUser) {
        
          localStorage.setItem("user", JSON.stringify(foundUser));

          toast.success("Giriş uğurludur!");
          setTimeout(() => {
            navigate("/profile"); 
          }, 1000);
        } else {
          toast.error("Email və ya şifrə yanlışdır.");
        }
      } catch (err) {
        console.error("Xəta baş verdi:", err);
        toast.error("Server xətası baş verdi.");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">Shopline</h1>
        <p className="text-center text-gray-600 mb-6">Giriş edin</p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
          >
            Giriş et
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </div>
    </div>
  );
}
