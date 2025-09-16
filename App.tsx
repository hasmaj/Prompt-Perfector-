
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptEditor } from './components/PromptEditor';
import { AnalysisPanel } from './components/AnalysisPanel';
import { analyzePrompt } from './services/geminiService';
import type { PromptAnalysis } from './types';
import { WandSparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzePrompt(prompt);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError('Failed to analyze prompt. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <PromptEditor
            prompt={prompt}
            setPrompt={setPrompt}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
           {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
           {!analysis && !isLoading && !error && (
             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center h-full">
                <WandSparklesIcon className="w-16 h-16 text-indigo-400 mb-4" />
                <h2 className="text-xl font-bold text-white">Ready to Perfect Your Prompt?</h2>
                <p className="text-gray-400 mt-2">Enter your prompt in the editor above and click "Analyze" to get AI-powered feedback and suggestions.</p>
             </div>
           )}
        </div>
        <div className="flex flex-col">
          <AnalysisPanel analysis={analysis} isLoading={isLoading} prompt={prompt} setPrompt={setPrompt} />
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini API. Designed for educational and creative purposes.</p>
      </footer>
    </div>
  );
};

export default App;
