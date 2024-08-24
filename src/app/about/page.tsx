import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-white text-gray-900">
      <h1 className="text-3xl font-semibold mb-8 text-center">حول الموقع</h1>
      <p className="text-lg mb-6 text-center leading-relaxed">
        بسم الله الرحمن الرحيم
      </p>
      <p className="text-xl mb-8 text-center leading-relaxed">
        مصحف المدينة المنورة برواية ورش عن طريق الأزرق، الموقع مفتوح المصدر على{" "}
        <Link
          href="https://github.com/adelpro/open-mushaf"
          className="text-blue-500 hover:underline"
        >
          Github
        </Link>
      </p>
      <p className="text-xl mb-6 text-center">
        من برمجة وتصميم{" "}
        <Link
          href="https://github.com/adelpro"
          className="text-blue-500 hover:underline"
        >
          adelpro
        </Link>
      </p>
    </div>
  );
}
