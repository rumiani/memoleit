"use client";

import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope,
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  const checkAndUpdateStatus = async () => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        console.log(event.data); // Handle the result from the service worker
      };

      navigator.serviceWorker.controller.postMessage({ type: "CHECK_STATUS" }, [
        messageChannel.port2,
      ]);
    }
  };

  useEffect(() => {
    // Call this function when you want to check and update the status
    checkAndUpdateStatus();
  }, []);

  return <div className="p-2">{children}</div>;
}
