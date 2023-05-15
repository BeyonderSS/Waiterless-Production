// pages/_app.js
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Bellota_Text } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../context/AuthContext";
import Script from "next/script";
import { useEffect } from "react";

const bellotaTextBold = Bellota_Text({
  weight: "700",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps,...appProps }) {
  useEffect(() => {
    typeof window !== undefined &&
      window.document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });

    document.onkeydown = function (e) {
      console.log(e.key);
      if (e.key === "F12") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        return false;
      }
      if (e.ctrlKey && e.key === "u") {
        return false;
      }
      if (e.ctrlKey && e.key === "c") {
        return false;
      }
    };
  }, []);
  if ([`/Dashboard/Dashboard`].includes(appProps.router.pathname))
    return <Component {...pageProps} />;

  return (
    <AuthProvider>
      <main className={bellotaTextBold.className}>
        <div className="select-none ">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </main>
    </AuthProvider>
  );
}
