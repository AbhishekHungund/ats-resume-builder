import React, { useState } from 'react';
import { FileText, Wand2, Loader2 } from 'lucide-react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { checkGrammarAndSpelling } from '../../services/aiService';
import toast from 'react-hot-toast';

const ProfessionalSummary = () => {
  const { resumeData, updateProfessionalSummary } = useResumeStore();
  const summary = resumeData.professionalSummary || '';
  const [isImproving, setIsImproving] = useState(false);

  const wordCount = summary.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleImproveSummary = async () => {
    if (!summary || summary.trim().length === 0) {
      toast.error('Please write something in the summary first to improve it.');
      return;
    }

    setIsImproving(true);
    const toastId = toast.loading('Improving grammar and tone...');

    try {
      const improvedText = await checkGrammarAndSpelling(summary);
      updateProfessionalSummary(improvedText);
      toast.success('Summary improved successfully!', { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FileText className="text-blue-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Professional Summary</h2>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${wordCount >= 50 && wordCount <= 150 ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}>
          {wordCount} words
        </span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-end mb-2">
          <label className="block text-sm font-semibold text-gray-700 max-w-[70%]">
            Write a short, impactful summary highlighting your key achievements and career goals.
          </label>
          <button 
            onClick={handleImproveSummary}
            disabled={isImproving || !summary.trim()}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-emerald-100"
            title="Fix grammar, spelling, and tone with AI"
          >
            {isImproving ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
            Enhance with AI
          </button>
        </div>
        <textarea 
          value={summary}
          onChange={(e) => updateProfessionalSummary(e.target.value)}
          placeholder="e.g. Innovative software engineer with 5+ years of experience in building scalable web applications. Proven track record of improving system performance by 30%..."
          rows={6}
          className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y custom-scrollbar"
        />
        <div className="flex justify-end mt-2">
           <p className={`text-xs font-semibold ${wordCount >= 50 && wordCount <= 150 ? 'text-green-600' : 'text-gray-500'}`}>
             Target 50-150 words for optimal ATS scoring.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
