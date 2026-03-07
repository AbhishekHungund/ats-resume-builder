import React, { useState } from 'react';
import { Building2, UserCircle, Briefcase, FileText, Sparkles, Loader2, Save } from 'lucide-react';
import { useResumeStore } from '../hooks/useResumeStore';
import { generateCoverLetter } from '../services/aiService';
import toast from 'react-hot-toast';

const CoverLetterEditor = () => {
  const { resumeData, updateCoverLetterData } = useResumeStore();
  const data = resumeData.coverLetterData || {};
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!data.companyName || !data.targetRole) {
      toast.error('Company Name and Target Role are required.');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('Writing your cover letter...');

    try {
      const content = await generateCoverLetter(resumeData);
      updateCoverLetterData({ generatedContent: content });
      toast.success('Cover Letter generated!', { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
        <div className="bg-slate-50 px-6 py-4 flex items-center gap-3 border-b border-gray-200">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Building2 className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Target Role Info</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <Building2 size={16} className="text-gray-400" /> Company Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={data.companyName || ''} 
                onChange={(e) => updateCoverLetterData({ companyName: e.target.value })}
                placeholder="e.g. OpenAI"
                className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                <Briefcase size={16} className="text-gray-400" /> Target Role <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={data.targetRole || ''} 
                onChange={(e) => updateCoverLetterData({ targetRole: e.target.value })}
                placeholder="e.g. Frontend Engineer"
                className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <UserCircle size={16} className="text-gray-400" /> Hiring Manager Name (Optional)
            </label>
            <input 
              type="text" 
              value={data.hiringManager || ''} 
              onChange={(e) => updateCoverLetterData({ hiringManager: e.target.value })}
              placeholder="e.g. Jane Doe or 'Hiring Manager'"
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <FileText size={16} className="text-gray-400" /> Job Description (Optional but Recommended)
            </label>
            <p className="text-xs text-gray-500 mb-2">Paste the key requirements so the AI can tailor your experience to match them exactly.</p>
            <textarea 
              value={data.jobDescription || ''} 
              onChange={(e) => updateCoverLetterData({ jobDescription: e.target.value })}
              placeholder="Looking for a React developer with 3+ years experience in Tailwind..."
              rows={4}
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y custom-scrollbar text-sm"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !data.targetRole || !data.companyName}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Generate Cover Letter
            </button>
          </div>
        </div>
      </div>

      {/* Editor Result */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
         <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FileText className="text-indigo-600" size={20} />
              Letter Content
            </h2>
            <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2.5 py-1 rounded-full">
              Editable
            </span>
         </div>
         <div className="p-6">
            <textarea 
              value={data.generatedContent || ''} 
              onChange={(e) => updateCoverLetterData({ generatedContent: e.target.value })}
              placeholder="Your cover letter content will appear here..."
              rows={15}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-y custom-scrollbar text-sm leading-relaxed"
            />
         </div>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
