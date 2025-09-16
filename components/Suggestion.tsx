
import React, { useState } from 'react';
import type { PromptSuggestion } from '../types';
import { getEnhancementSuggestions } from '../services/geminiService';
import { ChevronDownIcon, ClipboardIcon, LightbulbIcon, LoaderCircleIcon, PlusIcon } from './icons';

interface SuggestionProps {
  suggestion: PromptSuggestion;
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const categoryStyles: { [key: string]: { bg: string; text: string; } } = {
  Clarity: { bg: 'bg-blue-900/50', text: 'text-blue-300' },
  Specificity: { bg: 'bg-green-900/50', text: 'text-green-300' },
  Persona: { bg: 'bg-purple-900/50', text: 'text-purple-300' },
  Format: { bg: 'bg-yellow-900/50', text: 'text-yellow-300' },
  Constraint: { bg: 'bg-red-900/50', text: 'text-red-300' },
  Ambiguity: { bg: 'bg-orange-900/50', text: 'text-orange-300' },
};

export const Suggestion: React.FC<SuggestionProps> = ({ suggestion, prompt, setPrompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enhancements, setEnhancements] = useState<string[]>([]);
  
  const styles = categoryStyles[suggestion.category] || categoryStyles.Clarity;

  const handleGetIdeas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ideas = await getEnhancementSuggestions(prompt, suggestion.category);
      setEnhancements(ideas);
    } catch (e) {
      setError('Could not fetch ideas.');
    } finally {
      setIsLoading(false);
    }
  };

  const appendToPrompt = (text: string) => {
    setPrompt(prompt + `\n\n${text}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="bg-gray-900/70 border border-gray-700 rounded-lg transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded text-xs font-bold ${styles.bg} ${styles.text}`}>
            {suggestion.category}
          </span>
          <span className="font-semibold text-white">{suggestion.title}</span>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-700">
          <p className="text-gray-300 mt-2">{suggestion.description}</p>
          <div className="mt-4">
            <button
                onClick={handleGetIdeas}
                disabled={isLoading}
                className="bg-indigo-600/20 text-indigo-300 font-semibold py-2 px-3 text-sm rounded-lg flex items-center gap-2 hover:bg-indigo-600/40 disabled:opacity-50 transition-colors"
            >
                {isLoading ? <LoaderCircleIcon className="w-4 h-4 animate-spin" /> : <LightbulbIcon className="w-4 h-4" />}
                Get Ideas
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            {enhancements.length > 0 && (
                <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-400">Example Enhancements:</h4>
                    {enhancements.map((idea, i) => (
                        <div key={i} className="bg-gray-800 p-3 rounded-lg text-sm text-gray-200 flex justify-between items-center gap-2">
                            <p className="flex-grow">{idea}</p>
                            <div className="flex gap-2 flex-shrink-0">
                                <button onClick={() => appendToPrompt(idea)} title="Add to prompt" className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><PlusIcon className="w-4 h-4"/></button>
                                <button onClick={() => copyToClipboard(idea)} title="Copy" className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><ClipboardIcon className="w-4 h-4"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
