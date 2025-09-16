
import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = 'text-green-400';
  if (score < 50) {
    colorClass = 'text-red-400';
  } else if (score < 75) {
    colorClass = 'text-yellow-400';
  }

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 140 140">
        <circle
          className="text-gray-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="70"
          cy="70"
        />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="70"
          cy="70"
          transform="rotate(-90 70 70)"
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${colorClass}`}>
        {score}
      </div>
    </div>
  );
};
