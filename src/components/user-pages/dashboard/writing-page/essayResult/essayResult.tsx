import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EssayInfo } from "./essayInfo/essayInfo";

export default function EssayResult({ result }: { result: string }) {
  return (
    <div>
      <div className="flex flex-row gap-2 justify-center">
        <strong className="text-center block">Your Essay analisis</strong>
        <EssayInfo />
      </div>
      <div className="w-full mx-auto max-w-xl bg-gray-100 p-4 rounded-lg shadow-lg text-justify">
        <ReactMarkdown
          // eslint-disable-next-line react/no-children-prop
          children={result}
          remarkPlugins={[remarkGfm]}
          components={{
            // Tailwind CSS for **bold**
            strong: ({ children }) => (
              <strong className="font-bold text-lg">{children}</strong>
            ),
            // Tailwind CSS for ```code blocks```
            code: ({ children }) => (
              <code className="text-blue-500 px-1 py-1 rounded">
                {children}
              </code>
            ),
            // Tailwind CSS for ```code blocks``` in a block (``` multi-line)
            pre: ({ children }) => (
              <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
                {children}
              </pre>
            ),
          }}
        />
      </div>
    </div>
  );
}
