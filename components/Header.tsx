import React from 'react';
import { PencilIcon } from './Icons'; // Assuming we'll create a simple icon file or inline it, let's inline for simplicity below

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 bg-white border-b border-gray-200 flex flex-col items-center justify-center shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">NanoSketch</h1>
      </div>
      <p className="text-gray-500 text-sm max-w-md text-center">
        Turn your ideas into hand-drawn illustrations instantly. <br />
        <span className="text-xs text-gray-400">Powered by Gemini 2.5 Flash Image</span>
      </p>
    </header>
  );
};
