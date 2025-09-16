
import React from 'react';
import { LoaderCircleIcon, WandSparklesIcon } from './icons';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt, onAnalyze, isLoading }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-1 flex flex-col h-full shadow-lg">
      <div className="p-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Prompt Editor</h2>
        <p className="text-sm text-gray-400">Enter your prompt below to get started.</p>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Write a short story about a robot who discovers music..."
          className="w-full h-full min-h-[300px] bg-gray-800 text-gray-200 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
          disabled={isLoading}
        />
      </div>
      <div className="p-3 border-t border-gray-700">
        <button
          onClick={onAnalyze}
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-500 disabled:bg-indigo-900/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <LoaderCircleIcon className="animate-spin w-5 h-5" />
              Analyzing...
            </>
          ) : (
            <>
              <WandSparklesIcon className="w-5 h-5" />
              Analyze Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
};
