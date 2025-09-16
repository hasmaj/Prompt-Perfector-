
import React from 'react';
import type { PromptAnalysis } from '../types';
import { Suggestion } from './Suggestion';
import { ScoreGauge } from './ScoreGauge';
import { LoaderCircleIcon } from './icons';

interface AnalysisPanelProps {
  analysis: PromptAnalysis | null;
  isLoading: boolean;
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const LoadingSkeleton: React.FC = () => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-pulse h-full">
    <div className="flex items-center justify-center mb-6">
       <div className="w-40 h-40 bg-gray-700 rounded-full"></div>
    </div>
    <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-8"></div>
    <div className="space-y-4">
      <div className="h-20 bg-gray-700 rounded-lg"></div>
      <div className="h-20 bg-gray-700 rounded-lg"></div>
      <div className="h-20 bg-gray-700 rounded-lg"></div>
    </div>
  </div>
);


export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, isLoading, prompt, setPrompt }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Analysis Report</h2>
      </div>
      <div className="p-6 flex-grow overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
            <ScoreGauge score={analysis.overallScore} />
            <p className="text-center font-medium mt-4 text-gray-300">{analysis.feedback}</p>
        </div>

        <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                <span className="font-semibold text-gray-400">Task Type:</span>
                <span className="text-white">{analysis.taskType}</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                <span className="font-semibold text-gray-400">Core Objective:</span>
                <span className="text-white text-right">{analysis.coreObjective}</span>
            </div>
        </div>
        
        <h3 className="font-semibold text-white mb-3">Suggestions for Improvement</h3>
        <div className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => (
            <Suggestion key={index} suggestion={suggestion} prompt={prompt} setPrompt={setPrompt} />
          ))}
        </div>
      </div>
    </div>
  );
};
