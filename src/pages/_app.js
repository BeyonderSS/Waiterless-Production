// pages/_app.js
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Bellota_Text } from 'next/font/google';
import "@/styles/globals.css";

const bellotaTextBold = Bellota_Text({
  weight: '700',
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={bellotaTextBold.className}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </main>
  );
}
