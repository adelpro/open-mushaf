"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type props = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: props) {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (error) {
      // Extract a user-friendly message from the error object
      const userMessage = error.message || "An unexpected error occurred.";
      setErrorMessage(userMessage);

      // Log the error for debugging purposes
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mt-4 bg-gray-100">
      <div className="w-full max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
        <h2 className="mt-4 text-2xl font-bold">خطأ غير معروف</h2>

        <p className="mt-4 text-gray-600">{errorMessage}</p>

        <div className="mt-6 flex flex-col md:flex-row gap-2">
          <button
            onClick={() => router.push("/")}
            className="w-full max-w-md transition duration-300 ease-in-out mc-4 my-2 px-4 py-2 font-medium rounded bg-blue-500 hover:opacity-90 text-white"
          >
            العودة للصفحة الرئيسية
          </button>
          <button
            className="w-full max-w-md transition duration-300 ease-in-out mc-4 my-2 px-4 py-2 font-medium rounded bg-slate-400 hover:opacity-90 texte-slate-800"
            onClick={reset}
          >
            حاول مجددا
          </button>
        </div>
      </div>
    </div>
  );
}
