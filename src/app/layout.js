import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Westbrook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">

        <NavBar />

        {/* This pushes footer down */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
