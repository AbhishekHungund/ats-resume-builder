import React from 'react';
import { useResumeStore } from '../hooks/useResumeStore';
import { X, Check } from 'lucide-react';

const templates = [
  {
    id: "classic",
    name: "Classic (ATS Safe)",
    description: "Clean, traditional, parses perfectly",
    preview: "/templates/classic.svg"
  },
  {
    id: "modern",
    name: "Modern (Creative)",
    description: "Two-column with pop of color",
    preview: "/templates/modern.svg"
  },
  {
    id: "minimal",
    name: "Minimal (Clean)",
    description: "Elegant spacing and thin borders",
    preview: "/templates/minimal.svg"
  },
  {
    id: "executive",
    name: "Executive (Senior)",
    description: "Heavy bold headers, authoritative",
    preview: "/templates/executive.svg"
  },
  {
    id: "creative",
    name: "Creative (Design)",
    description: "Colorful headers and quirky grids",
    preview: "/templates/creative.svg"
  }
];

const TemplateGallery = ({ isOpen, onClose }) => {
  const { resumeData, setTemplate } = useResumeStore();
  const selectedTemplate = resumeData.template;

  if (!isOpen) return null;

  const handleTemplateSelect = (templateId) => {
    setTemplate(templateId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white shadow-sm z-10">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Template Gallery</h2>
            <p className="text-slate-500 mt-1 text-sm font-medium">Select a beautifully designed layout for your resume.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50 flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {templates.map((t) => {
              const isSelected = selectedTemplate === t.id;
              return (
                <div 
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`group relative flex flex-col bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-indigo-600 shadow-xl ring-4 ring-indigo-50 -translate-y-2' : 'border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1'}`}
                >
                  <div className="p-2 relative">
                    <img 
                      src={t.preview} 
                      alt={t.name} 
                      className="w-full h-48 object-cover rounded" 
                      onError={(e) => { e.target.onError = null; e.target.src = '/templates/placeholder.svg'; }}
                    />
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-indigo-600 text-white p-1.5 rounded-full shadow-md z-10 animate-in zoom-in">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="p-4 pt-2 border-t border-gray-100 bg-white z-10">
                    <h3 className={`font-bold ${isSelected ? 'text-indigo-700' : 'text-gray-900'}`}>{t.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{t.description}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateSelect(t.id);
                      }}
                      className={`w-full mt-4 py-2 rounded-lg text-sm font-bold transition-colors ${isSelected ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-50 text-gray-700 group-hover:bg-indigo-600 group-hover:text-white'}`}
                    >
                      {isSelected ? 'Selected' : 'Use Template'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TemplateGallery;
