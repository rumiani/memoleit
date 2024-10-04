import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function Story({ story }: { story: string }) {
  return (
    <div className="w-full mx-auto max-w-xl bg-gray-100 p-4 rounded-lg shadow-lg text-justify">
      <h2 className="font-bold text-start">Your story:</h2>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={story}
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
  );
}
