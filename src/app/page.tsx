import ItemsNav from "./components/home/NavItems";
import Review from "./components/home/review/review";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <ItemsNav/>
        <Review/>
      </div>
    </main>
  );
}
