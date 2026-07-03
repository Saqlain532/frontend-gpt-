import React, { useCallback, useEffect, useRef } from 'react'
import { useUserDataContext } from '../context/UserDataContext';
import { useAppContext } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TypingMarkdown } from './Typing';
import { ThinkingLoader } from './Loader';

const Chat = () => { 
  const { chatHistory, isLoading , reply } = useUserDataContext(); 
  const {newChat} = useAppContext();
 const containerRef = useRef(null);

const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []); 

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isLoading]);
  return (
    
    <div
     ref={containerRef}
     className='md:px-55 px-8 min-h-0 overflow-y-auto h-screen text-text-muted flex flex-col pb-24 pt-8'>
      { chatHistory.length === 0 && !isLoading && (
        <div className="flex-1 flex items-center justify-center h-full">
          <p className="text-xl opacity-50">Hi! How can I help you today?</p>
        </div>
      )}


      <div className="flex flex-col gap-6">
        { chatHistory.map((msg, index) => {
          
          const isLatestReply = index === chatHistory.length - 1 && msg.role === 'assistant' && msg.content === reply;

          return (<div 
            key={index} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`${msg.role === 'user' ? 'max-w-[80%] md:max-w-[70%]' : 'w-full md:max-w-[85%]'} p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-surface text-text-main rounded-br-sm' 
                  : 'bg-surface border border-border-subtle text-text-main rounded-bl-sm'
              }`}
            >
              {msg.role === 'user' ? (
                // Users send plain text,
                <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                  {msg.content}
                </p>
              ) : (
                // full Markdown rendering 
               <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed wrap-break-word"> 
                    {isLatestReply ? (
                      <TypingMarkdown fullText={msg.content} scrollToBottom={scrollToBottom} /> 
                    ):(
                      <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Style code blocks
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <div className="rounded-md overflow-hidden my-4 border border-border-subtle">
                            <div className="bg-background text-text-muted text-xs px-4 py-1 flex justify-between items-center border-b border-border-subtle">
                               <span>{match[1]}</span>
                            </div>
                            <SyntaxHighlighter
                              {...props}
                              children={String(children).replace(/\n$/, '')}
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{ margin: 0, background: 'black' }}
                            />
                          </div>
                        ) : (
                          // Style inline code (like `this`)
                          <code {...props} className="bg-background px-1.5 py-0.5 rounded-md text-primary text-sm font-mono border border-border-subtle">
                            {children}
                          </code>
                        )
                      },
                      // Custom styles for standard HTML tags
                      p: ({children}) => <p className="mb-4 last:mb-0">{children}</p>,
                      ul: ({children}) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                      li: ({children}) => <li className="mb-1">{children}</li>,
                      h1: ({children}) => <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>,
                      h3: ({children}) => <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                    )}
                  
                </div>
              )}
            </div>
          </div>)
        })}
      </div>
      {isLoading && (
        <div className="flex justify-start mt-6">
           {/* <div className="bg-surface border border-border-subtle text-text-main p-4 rounded-2xl rounded-bl-sm animate-pulse">
              Thinking...
           </div> */}
           <ThinkingLoader/>
        </div>
      )}
      
    </div>
  )
}

export default Chat
