import React from 'react';
import { useResumeStore } from '../hooks/useResumeStore';
import Classic from './templates/Classic';
import Modern from './templates/Modern';
import Minimal from './templates/Minimal';
import Executive from './templates/Executive';
import Creative from './templates/Creative';
import CoverLetterPreview from './CoverLetterPreview';

const PreviewPanel = () => {
  const { resumeData, appSettings } = useResumeStore();
  const { documentMode } = appSettings;
  
  const renderTemplate = () => {
    if (documentMode === 'coverLetter') {
      return <CoverLetterPreview />;
    }

    switch(resumeData.template) {
      case 'modern':
        return <Modern />;
      case 'minimal':
        return <Minimal />;
      case 'executive':
        return <Executive />;
      case 'creative':
        return <Creative />;
      case 'classic':
      default:
        return <Classic />;
    }
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow-2xl origin-top"
      style={{ 
        transform: 'scale(1)', 
        transformOrigin: 'top center',
      }}
    >
      {renderTemplate()}
    </div>
  );
};

export default PreviewPanel;
