import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function Result({ answer }: { answer: string }) {
  return (
    <div className="mt-6 w-full max-w-xl bg-gray-100 p-4 rounded-lg shadow-lg text-justify">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Your story:</h2>

      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={answer}
        remarkPlugins={[remarkGfm]}
        components={{
          // Tailwind CSS for **bold**
          strong: ({ children }) => (
            <strong className="font-bold text-lg">{children}</strong>
          ),
          // Tailwind CSS for ```code blocks```
          code: ({ children }) => (
            <code className="bg-gray-200 text-red-500 px-2 py-1 rounded">
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
  );
}
