import { useState, useEffect } from "react";
import { MdOutlineInstallDesktop } from "react-icons/md";
import { MdOutlineInstallMobile } from "react-icons/md";
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const InstallPWA: React.FC = () => {
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      console.log("beforeinstallprompt fired");
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler as any);

    // Check if the app is already installed
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    setIsInstalled(mediaQuery.matches);

    // Listen for changes in display mode
    const listener = (e: MediaQueryListEvent) => setIsInstalled(e.matches);
    mediaQuery.addListener(listener);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as any);
      mediaQuery.removeListener(listener);
    };
  }, []);

  const onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA || isInstalled) {
    return null;
  }

  return (
    <>
      <button
        id="setup_button"
        aria-label="Install MemoLeit"
        title="Install app"
        className="outline-none"
        onClick={onClick}
      >
        <MdOutlineInstallDesktop className="text-xl hidden sm:block" />
        <MdOutlineInstallMobile className="text-xl  block sm:hidden" />
      </button>
    </>
  );
};

export default InstallPWA;
