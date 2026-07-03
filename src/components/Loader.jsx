import React from 'react';

export const ThinkingLoader = () => {
  return (
    <div className="flex items-center space-x-2 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-2xl rounded-tl-none max-w-20 justify-center shadow-sm">
      <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-custom-bounce "></div>
      <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-custom-bounce "></div>
      <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-custom-bounce"></div>
    </div>
  );
};