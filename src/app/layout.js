import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { Montserrat, Playfair_Display } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});


export const metadata = {
  title: "Westbrook",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${playfair.variable} min-h-screen flex flex-col`}
      >

        <NavBar />

        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}