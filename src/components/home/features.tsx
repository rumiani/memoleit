import React from "react";
import { IoSettings } from "react-icons/io5";

const features = [
  {
    title: "Customizable Flashcards",
    description:
      "Create and manage flashcards tailored to your learning goals.",
    icon: <IoSettings />,
  },
  {
    title: "Leitner Box Organization",
    description:
      "Organize your flashcards into boxes based on familiarity and and saved time.",
    icon: <IoSettings />,
  },
  {
    title: "Spaced Repetition Scheduling",
    description:
      "Review your flashcards at optimal intervals for long-term retention.",
    icon: <IoSettings />,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and see how you're advancing through the boxes.",
    icon: <IoSettings />,
  },
  {
    title: "Mobile Compatibility",
    description: "Study on the go with a mobile-friendly platform.",
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
          Memoleit helps you to learn more efficent and faster.
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
