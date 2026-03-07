import React, { useState } from 'react';
import { Download, FileText, FileDown, RefreshCw, Settings, PenTool } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useResumeStore } from '../hooks/useResumeStore';
import SettingsModal from './SettingsModal';

const Header = ({ onDownloadPdf, onDownloadDocx }) => {
  const { resetResume, template, setTemplate, appSettings, setDocumentMode } = useResumeStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { documentMode } = appSettings;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all data and start fresh?')) {
      resetResume();
      toast.success('Fields cleared successfully');
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl text-white shadow-md">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 tracking-tight">ResuMate</h1>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Free & ATS-Optimized</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">

          {/* Mode Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button 
              onClick={() => setDocumentMode('resume')}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${documentMode === 'resume' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Resume
            </button>
            <button 
              onClick={() => setDocumentMode('coverLetter')}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all flex items-center gap-1.5 ${documentMode === 'coverLetter' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Cover Letter
            </button>
          </div>
          
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-600 rounded-lg border border-gray-200 transition-colors shadow-sm"
            title="App Settings"
          >
            <Settings size={20} />
          </button>

          <div className="relative">
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 pr-8 hover:bg-gray-100 transition-colors cursor-pointer font-bold"
          >
            <option value="classic">Classic (ATS Safe)</option>
            <option value="modern">Modern (Creative)</option>
            <option value="minimal">Minimal (Clean)</option>
            <option value="executive">Executive (Senior)</option>
            <option value="creative">Creative (Design)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors"
          title="Clear all text and start fresh"
        >
          <RefreshCw size={18} />
          <span className="hidden lg:inline">Reset</span>
        </button>

        <div className="flex bg-blue-600 rounded-lg overflow-hidden shadow-md hover:bg-blue-700 transition-colors">
          <button 
            onClick={onDownloadPdf}
            className="flex items-center gap-2 text-white px-4 py-2 text-sm font-medium border-r border-blue-500/50 hover:bg-blue-500 transition-colors"
          >
            <FileDown size={18} />
            PDF
          </button>
          <button 
            onClick={onDownloadDocx}
            className="flex items-center gap-2 text-white px-4 py-2 text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            <Download size={18} />
            DOCX
          </button>
        </div>
      </div>
    </header>
    <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
  </>
  );
};

export default Header;
