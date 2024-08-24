"use client";
import React, { useState } from "react";
import NavButton from "./navButton";
import Link from "next/link";
import { cn } from "@/utils/cn";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="fixed flex items-end top-0 right-0 w-1 h-full bg-slate-600" />
      <NavButton isOpen={isOpen} toggleMenu={toggleMenu} />

      <div
        className={cn("absolute hidden bg-gray-800 opacity-50 z-30", {
          "block inset-0": isOpen,
        })}
        onClick={() => setIsOpen(false)}
      />

      <nav
        className={cn(
          "fixed top-0 right-0 h-full rounded-l-xl w-64 bg-gray-800 text-white transform translate-x-full transition-transform duration-300 ease-in-out z-30 pt-16 mt-2",
          { "translate-x-0": isOpen }
        )}
        aria-hidden={!isOpen}
        id="nav"
        role="navigation"
      >
        <ul className="flex flex-col mt-1 space-y-4 px-4">
          <li>
            <Link
              href="/"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              المصحف
            </Link>
          </li>
          <li>
            <Link
              href="/surahs"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              فهرس السور
            </Link>
          </li>
          <li>
            <Link
              href="/chapters"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              فهرس الأجزاء
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              حول الموقع
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 pr-2 hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              إتصل بنا
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
