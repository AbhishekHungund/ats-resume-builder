import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import Home from './components/Home';
import { exportToPdf } from './utils/exportPdf';
import { exportToDocx } from './utils/exportDocx';
import { useResumeStore } from './hooks/useResumeStore';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'builder'
  const [activeTab, setActiveTab] = useState('editor'); // for mobile switching
  const { resumeData } = useResumeStore();

  const handleDownloadPdf = async () => {
    toast.loading('Generating PDF...', { id: 'pdf' });
    await exportToPdf('resume-preview', 'ResuMate_Resume.pdf');
    toast.success('PDF Downloaded!', { id: 'pdf' });
  };

  const handleDownloadDocx = async () => {
    toast.loading('Generating DOCX...', { id: 'docx' });
    await exportToDocx(resumeData, 'ResuMate_Resume.docx');
    toast.success('DOCX Downloaded!', { id: 'docx' });
  };

  if (currentView === 'home') {
    return (
      <>
        <Toaster position="top-right" />
        <Home onStart={() => setCurrentView('builder')} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Toaster position="top-right" />
      <Header onNavigateHome={() => setCurrentView('home')} onDownloadPdf={handleDownloadPdf} onDownloadDocx={handleDownloadDocx} />
      
      {/* Mobile Tabs */}
      <div className="md:hidden flex border-b bg-white sticky top-[72px] z-40">
        <button 
          className={`flex-1 py-3 font-medium text-sm transition-colors ${activeTab === 'editor' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          onClick={() => setActiveTab('editor')}
        >
          Resume Editor
        </button>
        <button 
          className={`flex-1 py-3 font-medium text-sm transition-colors ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          onClick={() => setActiveTab('preview')}
        >
          Live Preview
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto flex flex-col md:flex-row h-[calc(100vh-73px)] overflow-hidden">
        {/* Editor Panel - Left side on Desktop */}
        <div className={`w-full md:w-[45%] lg:w-[40%] xl:w-[35%] h-full overflow-y-auto bg-white border-r border-slate-200 custom-scrollbar ${activeTab === 'editor' ? 'block' : 'hidden md:block'}`}>
          <EditorPanel />
        </div>

        {/* Preview Panel - Right side on Desktop */}
        <div className={`w-full md:w-[55%] lg:w-[60%] xl:w-[65%] h-full overflow-y-auto bg-slate-200/80 p-4 sm:p-8 custom-scrollbar ${activeTab === 'preview' ? 'block' : 'hidden md:flex justify-center'}`}>
          <div className="md:mx-auto transition-transform">
            <PreviewPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
