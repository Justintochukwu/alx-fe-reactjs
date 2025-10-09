import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  // Define initial values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Define validation schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const onSubmit = (values, { resetForm }) => {
    console.log("Form Data:", values);
    alert("Registration Successful!");
    resetForm();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Register (Formik)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <Field
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikForm;
