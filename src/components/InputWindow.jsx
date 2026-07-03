import React from 'react'
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import { useAppContext } from '../context/AppContext';
import { useUserDataContext } from '../context/UserDataContext';
import TextareaAutosize from 'react-textarea-autosize';

const InputWindow = () => {
  const {message, setMessage} = useAppContext();
  const {getChatReply} = useUserDataContext();
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      if (message.trim()) {
        getChatReply();
      }
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center  ">
      
     
      <div className="flex items-center border pl-4 gap-2 border-border-subtle p-1 rounded-2xl bg-surface  w-[70%]"className="flex items-end border pl-4 gap-2 border-border-subtle p-1 rounded-3xl bg-surface w-[70%] transition-all">
        
        <TextareaAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          minRows={1} 
          maxRows={6}
          className="flex-1 outline-none text-sm text-text-muted resize-none bg-transparent whitespace-pre-wrap overflow-y-auto max-h-40 py-2 custom-scrollbar"
          placeholder="Ask to Gromni"
        />

        <button  className={`p-2 mb-1 rounded-full border border-border-subtle transition-colors duration-200
          ${message.trim() ? "bg-primary text-text-main" : "bg-background text-text-muted opacity-50 cursor-not-allowed"} `}
          onClick={() => {
            if (message.trim()) getChatReply();
          }}
          disabled={!message.trim()}
          >
          <ArrowUpwardSharpIcon/>
        </button>

      </div>
      <p className='text-text-muted md:text-sm text-xs mt-2 flex'>Gromni is AI and Can make mistakes.</p>
    </div>
  )
}

export default InputWindow
