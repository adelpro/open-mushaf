import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/navMenu";

const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"] });
const rtl = true;
export const metadata: Metadata = {
  title: "مصحف المدينة المنورة - ورش",
  description: "موقع لعرض اللمصحف الكريم برواية ورش عن طريق الأزرق",
};

export const viewport = {
  width: 1,
  themeColor: "dark",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html dir={`${rtl ? "rtl" : "ltr"}`}>
      <body className={amiri.className}>
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
