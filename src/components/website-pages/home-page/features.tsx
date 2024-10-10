import { IoSettings } from "react-icons/io5";

const features = [
  {
    title: "Customizable Flashcards",
    description:
      "Easily create and personalize flashcards to suit your learning objectives.",
    icon: <IoSettings />,
  },
  {
    title: "AI-Enhanced Context Learning",
    description:
      "Generate stories with AI using your chosen words to master vocabulary in context.",
    icon: <IoSettings />,
  },
  {
    title: "In-Depth Essay Analysis",
    description:
      "Write essays, analyze them with AI, and receive personalized improvement tips.",
    icon: <IoSettings />,
  },
  {
    title: "Seamless PDF Integration",
    description:
      "Upload, read, and highlight PDFs without interrupting your flow, add terms directly to your Leitner box.",
    icon: <IoSettings />,
  },
  {
    title: "CSV and Word Package Support",
    description: "Import custom word lists via CSV files and download ready-made word packages to expand your library.",
    icon: <IoSettings />,
  },
];
export default function Features() {
  return (
    <div className="mt-16">
      <div>
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          Everything you need to memorise things faster
        </h2>
        <p className="text-lg mt-4 text-slate-600">
          Memoleit helps you to learn more efficiently and faster.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 items-start bg-white p-2 rounded-lg shadow-md"
          >
            <div className="mt-1 rounded-full w-10 h-10">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{item.title}</h3>{" "}
              <p className="text-slate-500 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
