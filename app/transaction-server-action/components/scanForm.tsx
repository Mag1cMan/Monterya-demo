import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function ScanForm() {
  const [qrCode, setQRCode] = useState('');
  const [file, setFile] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = async (data) => {
    try {
      // You can perform any necessary operations here with the form data
      console.log(data);
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <select
            id="amountSelect"
            {...register("amountSelect", { required: true })}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="5">$5</option>
            <option value="10">$10</option>
            <option value="20">$20</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a1 1 0 01-.7-.29l-3-3a1 1 0 111.41-1.42L10 10.59l2.3-2.3a1 1 0 111.4 1.42l-3 3A1 1 0 0110 12z" />
            </svg>
          </div>
        </div>
        <div>
          <label
            htmlFor="qrCode"
            className="block text-sm font-medium text-gray-700"
          >
            QR Code Image
          </label>
          <div className="mt-1 flex items-center justify-center">
            {" "}
            {/* Added justify-center class */}
            <img
              src="/Rickrolling_QR_code.png" // Path to the default image file
              alt="Default QR Code"
              className="object-cover w-48 h-48" // Adjust width and height as needed
              />
          </div>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            File Upload
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
