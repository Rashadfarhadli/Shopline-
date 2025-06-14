import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      profileImage: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Ad ən az 3 simvol olmalıdır")
        .required("Ad mütləqdir"),
      email: Yup.string()
        .email("Email düzgün deyil")
        .required("Email mütləqdir"),
      password: Yup.string()
        .min(6, "Şifrə ən az 6 simvol olmalıdır")
        .required("Şifrə mütləqdir"),
      profileImage: Yup.string().url("Düzgün URL daxil edin").notRequired(),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await fetch("http://localhost:5005/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error("Server xətası");

        toast.success("Hesabınız uğurla yaradıldı!");
        resetForm();
      } catch (error) {
        toast.error("Qeydiyyat zamanı xəta baş verdi.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold mb-2 text-gray-900">Shopline.az</h1>
      <h2 className="text-2xl mb-8 text-gray-700">Create your account</h2>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        noValidate
      >
        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Full Name *</span>
          <input
            type="text"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            className={`mt-1 block w-full rounded-md border p-2 focus:outline-none ${
              formik.touched.fullName && formik.errors.fullName
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
            placeholder="Your full name"
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <p className="text-red-600 text-sm mt-1">{formik.errors.fullName}</p>
          ) : null}
        </label>

        
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Email address *</span>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`mt-1 block w-full rounded-md border p-2 focus:outline-none ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
            placeholder="you@example.com"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
          ) : null}
        </label>

      
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Password *</span>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`mt-1 block w-full rounded-md border p-2 focus:outline-none ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
            placeholder="Your password"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
          ) : null}
        </label>

      
        <label className="block mb-6">
          <span className="text-gray-700 font-semibold">Profile Image (Optional)</span>
          <input
            type="text"
            name="profileImage"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.profileImage}
            className={`mt-1 block w-full rounded-md border p-2 focus:outline-none ${
              formik.touched.profileImage && formik.errors.profileImage
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            }`}
            placeholder="Image URL"
          />
          {formik.touched.profileImage && formik.errors.profileImage ? (
            <p className="text-red-600 text-sm mt-1">{formik.errors.profileImage}</p>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {formik.isSubmitting ? "Submitting..." : "Create Account"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={60000} theme="colored" />
    </div>
  );
}

export default Register;
