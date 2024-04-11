import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "../redux/provider";
import { NextAuthProvider } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/layout/footer/footer";
import Header from "../components/layout/header/header";
import InitializingData from "../components/initializingData/initializingData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemoLight",
  description: "Memorise anything faster",
  icons:{
    icon:'@/public/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <SpeedInsights />
        <NextAuthProvider>
          <ToastContainer limit={3} />
          <ReduxProvider>
            <div className="relative min-h-screen mx-auto max-w-screen-2xl">
              <InitializingData />
              <Header />
              <main className="pt-0 px-4 sm:px-6 mx-auto lg:px-8 w-full max-w-screen-lg min-h-screen break-words">
                {children}
              </main>
              <Footer />
            </div>
          </ReduxProvider>
          <ToastContainer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
