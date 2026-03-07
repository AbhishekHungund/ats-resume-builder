import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAtsScore } from '../hooks/useAtsScore';

const ATSScore = () => {
  const { score, tips } = useAtsScore();
  const [expanded, setExpanded] = React.useState(false);

  let scoreColor = 'text-red-500';
  let bgColor = 'bg-red-50';
  let borderColor = 'border-red-200';

  if (score >= 80) {
    scoreColor = 'text-green-600';
    bgColor = 'bg-green-50';
    borderColor = 'border-green-200';
  } else if (score >= 50) {
    scoreColor = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
    borderColor = 'border-yellow-200';
  }

  return (
    <div className={`mb-6 rounded-xl border ${borderColor} ${bgColor} overflow-hidden transition-all duration-300 shadow-sm`}>
      <div 
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-black/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 w-full">
          <div className="relative flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-sm shrink-0">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle
                className="text-gray-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="24"
                cx="28"
                cy="28"
              />
              <circle
                className={`${scoreColor} transition-all duration-1000 ease-out`}
                strokeWidth="4"
                strokeDasharray={24 * 2 * Math.PI}
                strokeDashoffset={24 * 2 * Math.PI - (score / 100) * 24 * 2 * Math.PI}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="24"
                cx="28"
                cy="28"
              />
            </svg>
            <span className={`absolute font-bold ${scoreColor}`}>{score}</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">ATS Match Score</h3>
            <p className="text-sm text-gray-600 font-medium">
              {score >= 80 ? 'Great job! Your resume is highly compatible.' : 'Needs improvement. Follow the tips below.'}
            </p>
          </div>
        </div>
        <div className="p-1 bg-white rounded-full shadow-sm ml-2">
          {expanded ? <ChevronUp className="text-gray-500 w-5 h-5" /> : <ChevronDown className="text-gray-500 w-5 h-5" />}
        </div>
      </div>

      {expanded && tips.length > 0 && (
        <div className="px-5 pb-5 pt-2 bg-white/50 border-t border-black/5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Improvement Tips</h4>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-3 text-sm">
                {tip.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                )}
                <span className="text-gray-700 font-medium">{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {expanded && tips.length === 0 && (
        <div className="px-5 pb-5 pt-2 bg-white/50 border-t border-black/5">
          <div className="flex gap-3 text-sm items-center">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
            <span className="text-gray-700 font-medium">Your resume is following all ATS best practices!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScore;
