import { cn } from "@/utils/cn";
import React from "react";

type Props = {
  isOpen: boolean;
  toggleMenu: () => void;
};
const genericHamburgerLine =
  "block md:hidden h-1 w-1 max-w-1 my-1 rounded-full bg-white transition ease transform duration-300 opacity-50 group-hover:opacity-100 w-full dark:bg-gray-100";

export default function NavButton({ isOpen, toggleMenu }: Props) {
  return (
    <button
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-controls="nav"
      aria-expanded={isOpen}
      title={isOpen ? "Close navigation menu" : "Open navigation menu"}
      role="button"
      aria-haspopup="true"
      className={cn(
        "fixed top-2 right-0 flex flex-col items-center justify-center w-6 md:w-20 h-20 md:h-40 group bg-slate-600 rounded-l-xl mt-5 p-2 z-50 transform transition-transform duration-300 ease-in-out hover:w-8 md:hover:w-24",
        {
          "w-8 h-10 mr-2 p-0 bg-transparent": isOpen,
        }
      )}
      onClick={toggleMenu}
    >
      <span className="sr-only">Toggle navigation menu</span>

      <span
        className={cn(genericHamburgerLine, {
          "rotate-45 translate-y-3 bg-white max-w-8": isOpen,
        })}
      />
      <span
        className={cn(genericHamburgerLine, {
          "opacity-0 group-hover:opacity-0 bg-white max-w-8": isOpen,
        })}
      />
      <span
        className={cn(genericHamburgerLine, {
          "-rotate-45 -translate-y-3 bg-white max-w-8": isOpen,
        })}
      />

      <span className={cn("hidden text-gray-200", { "md:block": !isOpen })}>
        ☰ القائمة
      </span>
    </button>
  );
}
