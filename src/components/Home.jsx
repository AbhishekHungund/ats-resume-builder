import React from 'react';
import { FileText, Sparkles, LayoutTemplate, Download } from 'lucide-react';

const Home = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Simple Navigation */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img src="/resumate-icon.svg" alt="ResuMate Logo" className="w-8 h-8 drop-shadow-sm" />
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 tracking-tight">
            ResuMate
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-10 sm:mt-20 max-w-4xl mx-auto">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-sm font-semibold mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles size={16} className="text-blue-600" />
          <span>Launch Your Career Faster</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
          Build a Winning Resume <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            in Minutes.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
          Create professional, ATS-optimized resumes and cover letters in real-time. Completely free, no watermarks, and entirely secure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500 fill-mode-both w-full sm:w-auto">
          <button 
            onClick={onStart}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all text-lg"
          >
            Create My Resume Now
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 mb-20 text-left w-full animate-in fade-in duration-1000 delay-700 fill-mode-both">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">ATS-Optimized</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm">Our real-time scoring engine ensures your resume gets past the bots and into the hands of recruiters.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <LayoutTemplate size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Premium Templates</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm">Choose from a variety of professionally designed, customizable layouts that stand out from the crowd.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Download size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Export Instantly</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-sm">Download as a pixel-perfect PDF or an ATS-parseable Word Document (DOCX) exactly when you need it.</p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;
