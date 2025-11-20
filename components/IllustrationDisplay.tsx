
import React from 'react';
import { AspectRatioKey } from '../constants';

interface IllustrationDisplayProps {
  imageData: string | null;
  loading: boolean;
  error: string | null;
  aspectRatio: AspectRatioKey;
}

export const IllustrationDisplay: React.FC<IllustrationDisplayProps> = ({ imageData, loading, error, aspectRatio }) => {
  // Download handler
  const handleDownload = () => {
    if (!imageData) return;
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `nano-sketch-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate CSS aspect ratio (replace ':' with '/')
  const ratioStyle = { aspectRatio: aspectRatio.replace(':', '/') };

  return (
    <div 
      className="w-full max-w-lg bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex items-center justify-center relative group transition-all duration-300 ease-in-out mx-auto"
      style={ratioStyle}
    >
      {loading ? (
        <div className="flex flex-col items-center p-8 animate-pulse">
          <div className="w-16 h-16 mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-400 text-sm font-medium">Sketching your idea...</p>
          <p className="text-gray-300 text-xs mt-2">Asking the artist (Gemini)...</p>
        </div>
      ) : error ? (
        <div className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-800 font-medium">Drawing Failed</p>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
        </div>
      ) : imageData ? (
        <>
          <img 
            src={imageData} 
            alt="Generated sketch" 
            className="w-full h-full object-cover bg-gray-100"
          />
          {/* Hover Overlay for Download */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-end justify-end p-4 pointer-events-none">
            <button
              onClick={handleDownload}
              className="pointer-events-auto bg-white text-gray-800 hover:text-indigo-600 px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
              Download
            </button>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-400 flex flex-col items-center justify-center h-full">
           <div className="hand-drawn-font text-3xl opacity-30 mb-2 rotate-[-5deg]">
            "by Navi"
          </div>
          <p className="text-sm">Your masterpiece will appear here</p>
        </div>
      )}
    </div>
  );
};
