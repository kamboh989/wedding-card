import type { Metadata } from "next";
import {  Nunito } from "next/font/google";
import "./globals.css";



// ✅ Nunito Font (GLOBAL)
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800","900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "Private wedding invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          
          ${nunito.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
