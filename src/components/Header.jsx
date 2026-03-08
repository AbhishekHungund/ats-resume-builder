import React, { useState } from 'react';
import { Download, FileText, FileDown, RefreshCw, Settings, PenTool, LayoutTemplate } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useResumeStore } from '../hooks/useResumeStore';
import SettingsModal from './SettingsModal';
import TemplateGallery from './TemplateGallery';

const Header = ({ onNavigateHome, onDownloadPdf, onDownloadDocx }) => {
  const { resetResume, template, setTemplate, appSettings, setDocumentMode } = useResumeStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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
        <div 
          className="flex items-center gap-3 mb-4 sm:mb-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onNavigateHome}
          title="Return to Home"
        >
          <img src="/resumate-icon.svg" alt="ResuMate Logo" className="w-9 h-9 drop-shadow-sm" />
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

          <button 
            onClick={() => setIsGalleryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 rounded-lg border border-indigo-100 transition-colors font-bold shadow-sm"
          >
            <LayoutTemplate size={18} />
            <span className="hidden sm:inline">Templates</span>
          </button>

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
    <TemplateGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
  </>
  );
};

export default Header;
