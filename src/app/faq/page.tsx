"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import forgettingCurve from "@/public/assets/images/forgettingCurve.png";
import ImgHoverZoom from "@/src/components/general/imgHoverZoom/imgHoverZoom";
// <Head>
//     <link rel="icon" href="/assets/favicon.ico" />
//     <title>Memoleit</title>
//     <meta name="author" content="Maziar Rumiani" />
//     <meta name="keywords" content="skill, memoleit" />
//     <meta name="description" content="Write about your skill path here ..." />
// </Head>

const q = [
  {
    id: 1,
    q: "What is the Leitner method?",
    a: (
      <>
        <p>
          The Leitner method is a learning technique that uses spaced repetition
          to optimize memory retention. Flashcards are organized into boxes
          based on familiarity, and you review the cards at increasing intervals
          for effective learning.,
        </p>

        <div className="w-full">
          <h2 className="text-center font-bold">The forgetting curve</h2>
          <ImgHoverZoom src={forgettingCurve} alt="Leitner box explained" />
        </div>
      </>
    ),
  },
  {
    id: 2,
    q: "How do I create flashcards on Memoleit?",
    a: (
      <>
        Creating flashcards is simple! You go to{" "}
        <Link href="/user/dashboard/new" className="text-blue-500">
          new flashcard
        </Link>{" "}
        and enter your question or vocabulary and enter an answer as the
        description or definition, then a category for that question.
      </>
    ),
  },
  {
    id: 3,
    q: "How often should I review my flashcards?",
    a: "Memoleit uses spaced repetition to schedule your reviews. Flashcards in lower boxes are reviewed more frequently, while those in higher boxes are reviewed less often.",
  },
  {
    id: 4,
    q: "Is Memoleit available on mobile devices?",
    a: "Absolutely! Memoleit is a PWA and can be installed on your device, it is designed to be mobile-friendly so you can study and review your flashcards on the go.",
  },
];
export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);
  const opendAnswerHandler = (id: number) => {
    setOpenId(id === openId ? null : id);
  };
  return (
    <>
      <div className="max-w-lg mx-auto m-4 p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently asked questions:
        </h2>
        {q.map((item) => (
          <div key={item.id} className=" p-2 my-4">
            <button
              onClick={() => opendAnswerHandler(item.id)}
              className="flex items-center justify-between w-full"
            >
              <span className="text-lg font-medium">
                {item.id}. {item.q}
              </span>
              <span
                className={` ${
                  openId === item.id ? "rotate-180" : "rotate-0"
                } text-gray-500 text-lg duration-500 transition-transform transform hover:scale-110`}
              >
                <FaChevronDown />
              </span>
            </button>
            {openId === item.id && (
              <div className=" border-t border-gray-300 mt-2 pl-4 transition-all duration-300">
                <p className="text-gray-600">{item.a}</p>
              </div>
            )}
          </div>
        ))}
        <div className="mt-10 text-center text-xl">
          <h3 className="my-4">Have more questions?</h3>
          <Link href="/contact" className="btn_secondary">
            <button className="primaryBtn min-w-48">Contact us</button>
          </Link>
        </div>
      </div>
    </>
  );
}
