
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptDisplay } from './components/PromptDisplay';
import { Loader } from './components/Loader';
import { generatePromptFromImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { PhotoIcon } from './components/icons/PhotoIcon';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setGeneratedPrompt('');
      setError(null);
    }
  };

  const handleGeneratePrompt = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const { base64, mimeType } = await fileToBase64(imageFile);
      const prompt = await generatePromptFromImage(base64, mimeType);
      
      // Clean up the response from Gemini, removing markdown fences
      const cleanedPrompt = prompt.replace(/^```markdown\n|```$/g, '').trim();
      
      setGeneratedPrompt(cleanedPrompt);
    } catch (err) {
      console.error(err);
      // FIX: Updated error message to be more generic and not mention API key, as per guidelines.
      setError('Failed to generate prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-brand-bg font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <ImageUploader onImageChange={handleImageChange} imageUrl={imageUrl} />
            <button
              onClick={handleGeneratePrompt}
              disabled={!imageFile || isLoading}
              className="w-full bg-brand-primary text-brand-bg font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-opacity-90 disabled:bg-brand-border disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            >
              {isLoading ? 'Analyzing Image...' : 'Generate Prompt'}
            </button>
          </div>
          <div className="bg-brand-surface rounded-lg p-6 border border-brand-border shadow-2xl relative min-h-[300px] lg:min-h-0">
            {isLoading && <Loader />}
            {error && !isLoading && <div className="text-red-400 text-center">{error}</div>}
            {!isLoading && !error && generatedPrompt && (
              <PromptDisplay prompt={generatedPrompt} />
            )}
            {!isLoading && !error && !generatedPrompt && (
              <div className="flex flex-col items-center justify-center h-full text-brand-text-secondary">
                <PhotoIcon className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-semibold">Your Generated Prompt Will Appear Here</h3>
                <p className="text-sm text-center mt-2">Upload an image and click "Generate Prompt" to see the magic happen.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;