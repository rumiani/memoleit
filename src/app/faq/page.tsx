"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown} from "react-icons/fa";
// <Head>
//     <link rel="icon" href="/assets/favicon.ico" />
//     <title>Skillpath</title>
//     <meta name="author" content="Maziar Rumiani" />
//     <meta name="keywords" content="skill, skillpath" />
//     <meta name="description" content="Write about your skill path here ..." />
// </Head>

const q = [
  {
    id: 1,
    q: "Is this a question about 11plus website?",
    a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium, pariatur praesentium quia modi nisi sed sequi minus magni eveniet, iste molestiae voluptatum architecto? Dolores aliquam ratione dignissimos dicta nobis!",
  },
  {
    id: 2,
    q: "Is this a question about 11plus website?",
    a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium, pariatur praesentium quia modi nisi sed sequi minus magni eveniet, iste molestiae voluptatum architecto? Dolores aliquam ratione dignissimos dicta nobis!",
  },
  {
    id: 3,
    q: "Is this a question about 11plus website?",
    a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium, pariatur praesentium quia modi nisi sed sequi minus magni eveniet, iste molestiae voluptatum architecto? Dolores aliquam ratione dignissimos dicta nobis!",
  },
  {
    id: 4,
    q: "Is this a question about 11plus website?",
    a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium, pariatur praesentium quia modi nisi sed sequi minus magni eveniet, iste molestiae voluptatum architecto? Dolores aliquam ratione dignissimos dicta nobis!",
  },
  {
    id: 5,
    q: "Is this a question about 11plus website?",
    a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium, pariatur praesentium quia modi nisi sed sequi minus magni eveniet, iste molestiae voluptatum architecto? Dolores aliquam ratione dignissimos dicta nobis!",
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
        {q.map( item => {
            console.log(openId === item.id);
          return (
            <div key={item.id} className=" border-b border-gray-300 p-2 my-4">
              <button
                onClick={() => opendAnswerHandler(item.id)}
                className="flex items-center justify-between w-full"
              >
                <span className="text-lg font-medium">
                  {item.id}. {item.q}
                </span>
                <span className={` ${openId === item.id ? 'rotate-180' : 'rotate-0' } text-gray-500 text-xl transition-transform transform hover:scale-110`}>
                  <FaChevronDown/>
                </span>
              </button>
              {openId === item.id && (
                <div className="mt-2 transition-all duration-300">
                  <p className="text-gray-600">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
        <div className="mt-10 text-center text-xl">
          <h3 className="my-4">Have more questions?</h3>
          <Link
            href="/contact"
            className="btn_secondary"
          >
            <button className="primaryBtn min-w-48">
            Contact Us
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
