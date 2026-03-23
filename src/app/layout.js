import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FloatingCTAs from "../components/FloatingCTAs";

import { Montserrat, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",      // prevents render-blocking — text shows in fallback font
                        // immediately, swaps to Montserrat once loaded
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",      // same benefit for Playfair Display
});

export const metadata = {
  title: "Westbrook",
  description: "Westbrook International School",
  icons: {
    icon: "/assets/Favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen flex flex-col">

        <NavBar />

        {/* FloatingCTAs mounted once here — removed from every individual page */}
        <FloatingCTAs />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}