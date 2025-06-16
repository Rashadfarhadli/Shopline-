import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email düzgün formatda olmalıdır")
        .required("Email daxil edin"),
      password: Yup.string().required("Şifrə daxil edin"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch(
          `http://localhost:5005/admins?email=${encodeURIComponent(
            values.email
          )}&password=${encodeURIComponent(values.password)}`
        );
        const data = await res.json();

        if (data.length > 0) {
          toast.success("Giriş uğurludur! Dashboarda yönləndirilirsiniz...");
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1500);
        } else {
          toast.error("Email və ya şifrə yalnışdır");
        }
      } catch (err) {
        toast.error("Serverə qoşulmaq mümkün olmadı");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer position="top-center" />
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Girişi</h2>

       
        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 ${
            formik.touched.email && formik.errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-600 mb-3 text-sm">{formik.errors.email}</p>
        ) : null}

  
        <label className="block mb-2 font-semibold" htmlFor="password">
          Şifrə
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Şifrənizi daxil edin"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={`w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 ${
            formik.touched.password && formik.errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-600 mb-3 text-sm">{formik.errors.password}</p>
        ) : null}

       
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer ${
            formik.isSubmitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {formik.isSubmitting ? "Yoxlanılır..." : "Daxil ol"}
        </button>
      </form>
    </div>
  );
}
