import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "../redux/provider";
import { NextAuthProvider } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/layouts/generalLayout/footer/footer";
import Header from "../components/layouts/generalLayout/header/header";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Memoleit";
const APP_DEFAULT_TITLE = "Memoleit";
const APP_TITLE_TEMPLATE = "%s - Memoleit";
const APP_DESCRIPTION = "Memorise anything faster";
export const metadata: Metadata = {
  icons: {
    icon: "/favicon/favicon.ico",
  },
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "./manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
          <ToastContainer limit={3} autoClose={3000} closeOnClick />
          <ReduxProvider>
            <div className=" relative mx-auto max-w-screen-2xl">
              <Header />
              <main className="mt-24 mb-4 pt-0 px-4 sm:px-6 mx-auto lg:px-8 w-full max-w-screen-2xl h-screen break-words">
                {children}
              </main>
              <Footer />
            </div>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
