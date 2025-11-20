
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { IllustrationDisplay } from './components/IllustrationDisplay';
import { generateIllustration } from './services/geminiService';
import { ERROR_MESSAGES, AspectRatioKey } from './constants';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioKey>("1:1");

  const handleGenerate = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setImage(null); // Clear previous image while loading

    try {
      const result = await generateIllustration(prompt, aspectRatio);
      setImage(result);
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || ERROR_MESSAGES.GENERIC);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center p-4 sm:p-8 max-w-4xl mx-auto w-full">
        
        <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[400px] gap-8">
          
          {/* Output Section */}
          <IllustrationDisplay 
            imageData={image} 
            loading={loading} 
            error={error}
            aspectRatio={aspectRatio} 
          />

          {/* Input Section */}
          <InputArea 
            onGenerate={handleGenerate} 
            loading={loading}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio} 
          />

        </div>

        {/* Optional: History or Gallery could go here in V2 */}
      </main>
      
      <footer className="py-4 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} NanoSketch. Powered by Google Gemini API.
      </footer>
    </div>
  );
};

export default App;
