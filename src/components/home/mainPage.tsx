import Link from "next/link";
import Features from "./features";
import Hero from "./hero";
import Cta from "./cta";

const MainPage = () => {
  return (
    <div className="max-w-5xl">
      <Hero />
      <Features />
      <Cta />
    </div>
  );
};

export default MainPage;

