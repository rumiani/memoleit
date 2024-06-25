import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "../redux/provider";
import { NextAuthProvider } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/general/layouts/generalLayout/footer/footer";
import Header from "../components/general/layouts/generalLayout/header/header";
import { getServerSession } from "next-auth";
import usePushNotifications from "../components/hooks/usePushNotifications";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "MemoLeit";
const APP_DEFAULT_TITLE = "MemoLeit";
const APP_TITLE_TEMPLATE = "%s - MemoLeit";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto max-w-screen-2xl`}>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <NextAuthProvider session={session}>
          <ReduxProvider>
            <SpeedInsights />
            <ToastContainer limit={3} autoClose={3000} closeOnClick />
            <Header />
            <main className="mt-24 mb-4 pt-0 px-4 sm:px-6 sm:min-h-screen mx-auto lg:px-8 w-full max-w-screen-2xl break-words">
              {children}
            </main>
            <Footer />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
