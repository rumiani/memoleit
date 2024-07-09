import Features from "./features";
import Hero from "./hero";
import Cta from "./cta";

const MainPage = () => {
  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <Hero />
      <Features />
      <Cta />
    </div>
  );
};

export default MainPage;
