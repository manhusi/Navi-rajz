
import React, { useState, KeyboardEvent } from 'react';
import { ASPECT_RATIOS, AspectRatioKey } from '../constants';

interface InputAreaProps {
  onGenerate: (prompt: string) => void;
  loading: boolean;
  aspectRatio: AspectRatioKey;
  setAspectRatio: (ratio: AspectRatioKey) => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onGenerate, loading, aspectRatio, setAspectRatio }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onGenerate(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-lg mt-6">
      {/* Aspect Ratio Selectors */}
      <div className="flex justify-center gap-2 mb-3">
        {(Object.keys(ASPECT_RATIOS) as AspectRatioKey[]).map((ratio) => (
          <button
            key={ratio}
            onClick={() => setAspectRatio(ratio)}
            disabled={loading}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              aspectRatio === ratio
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {ratio}
          </button>
        ))}
      </div>

      <div className="relative flex items-center w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="E.g., a flying cat, a cozy cabin..."
          disabled={loading}
          // Updated classes: bg-gray-800 for dark background, text-white for light text
          className="w-full pl-5 pr-14 py-4 rounded-full border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 shadow-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all text-lg disabled:bg-gray-900 disabled:text-gray-500"
        />
        
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`absolute right-2 p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
            input.trim() && !loading
              ? 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-md hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Generate"
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Just type the subject. The style is applied automatically.
      </p>
    </div>
  );
};
