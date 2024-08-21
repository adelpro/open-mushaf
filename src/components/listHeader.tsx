import Link from "next/link";
import React from "react";

export default function ListHeader() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <Link href="/chapters">
        <h1 className="text-xl font-bold text-center w-full mb-5 tracking-wide text-slate-600 dark:text-slate-200 underline">
          فهرس الأجزاء
        </h1>
      </Link>

      <Link href="/surahs">
        <h1 className="text-xl font-bold text-center w-full mb-5 tracking-wide text-slate-600 dark:text-slate-200 underline">
          فهرس السور
        </h1>
      </Link>
    </div>
  );
}
