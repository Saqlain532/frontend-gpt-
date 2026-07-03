import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const TypingMarkdown = ({ fullText, scrollToBottom }) => { 
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Reset displayed text when fullText changes
    setDisplayedText("");
    const words = fullText.split(" ");
    let i = 0;
    let currentText = "";

    const timer = setInterval(() => {
      if (i < words.length) {
        currentText += (i === 0 ? "" : " ") + words[i];
        setDisplayedText(currentText);
        scrollToBottom(); 
        i++;
      } else {
        clearInterval(timer);
      }
    }, 10); 

    return () => clearInterval(timer);
  }, [fullText, scrollToBottom]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <div className="rounded-md overflow-hidden my-4 border border-border-subtle">
              <div className="bg-background text-text-muted text-xs px-4 py-1 flex justify-between items-center border-b border-border-subtle">
                 <span>{match[1]}</span>
              </div>
              <SyntaxHighlighter {...props} style={vscDarkPlus} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} customStyle={{ margin: 0, background: 'black' }} />
            </div>
          ) : (
            <code {...props} className="bg-background px-1.5 py-0.5 rounded-md text-primary text-sm font-mono border border-border-subtle">{children}</code>
          )
        },
        p: ({children}) => <p className="mb-4 last:mb-0">{children}</p>,
        ul: ({children}) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
        li: ({children}) => <li className="mb-1">{children}</li>,
        h1: ({children}) => <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>,
        h3: ({children}) => <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>,
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
};