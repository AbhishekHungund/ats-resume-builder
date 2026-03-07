import React, { useState } from 'react';
import { Target, Search, Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { analyzeJobMatch } from '../../services/aiService';
import toast from 'react-hot-toast';

const JobMatcher = () => {
  const { resumeData } = useResumeStore();
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // Collapsible

  const handleAnalyze = async () => {
    if (!jobDescription || jobDescription.trim() === '') {
      toast.error('Please paste a job description first.');
      return;
    }

    setIsAnalyzing(true);
    const toastId = toast.loading('Analyzing resume against job description...');

    try {
      const result = await analyzeJobMatch(resumeData, jobDescription);
      setAnalysisResult(result);
      setIsExpanded(true); // Open the results view
      toast.success('Analysis complete!', { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setJobDescription('');
    setAnalysisResult(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden mb-6 transition-all hover:shadow-md relative">
      {/* Header */}
      <div 
        className="bg-indigo-50 px-6 py-4 flex items-center justify-between border-b border-indigo-100 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-sm">
            <Target size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Job Description Matcher</h2>
            {analysisResult && (
              <p className="text-xs font-semibold text-indigo-600">
                Match Score: {analysisResult.matchPercentage}%
              </p>
            )}
          </div>
        </div>
        <button 
          className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Search size={16} className="text-gray-400" /> Paste Job Description
            </label>
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here. We'll analyze your current resume data to find missing skills and exact keyword matches..."
              rows={4}
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-3 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y custom-scrollbar text-sm"
            />
            <div className="flex justify-between mt-3">
              {analysisResult ? (
                 <button 
                  onClick={clearAnalysis}
                  className="text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear Analysis
                </button>
              ) : <div></div>}
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                Analyze Match
              </button>
            </div>
          </div>

          {/* Results Area */}
          {analysisResult && (
            <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-5 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
              
              {/* Score visually */}
              <div className="flex items-center gap-4 border-b border-indigo-100 pb-5">
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                   <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="4"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" className={`${analysisResult.matchPercentage >= 70 ? 'stroke-green-500' : analysisResult.matchPercentage >= 40 ? 'stroke-yellow-500' : 'stroke-red-500'}`} strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - analysisResult.matchPercentage} strokeLinecap="round"></circle>
                  </svg>
                  <span className="absolute text-xl font-bold text-gray-800">{analysisResult.matchPercentage}%</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Resume Match Score</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {analysisResult.matchPercentage >= 80 ? 'Excellent match! Your resume is highly tailored for this role.' : 
                     analysisResult.matchPercentage >= 60 ? 'Good match. Consider adding some of the missing keywords below to improve your chances.' : 
                     'Low match. You should significantly tailor your experience and skills to the job description.'}
                  </p>
                </div>
              </div>

              {/* Missing Keywords */}
              {analysisResult.missingKeywords && analysisResult.missingKeywords.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                     <AlertCircle size={16} className="text-orange-500" /> Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white border border-orange-200 text-orange-700 text-xs font-semibold rounded-md shadow-sm">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                     <CheckCircle2 size={16} className="text-indigo-500" /> Actionable Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.map((sug, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700 align-start">
                        <span className="shrink-0 text-indigo-400 mt-0.5">•</span>
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobMatcher;
