import React from 'react';
import { useResumeStore } from '../hooks/useResumeStore';

const CoverLetterPreview = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo, coverLetterData, themeColor, fontFamily } = resumeData;
  const { companyName, hiringManager, generatedContent } = coverLetterData || {};

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      className="w-full h-full bg-white flex flex-col"
      style={{ fontFamily: fontFamily }}
    >
      {/* Header section matching a general elegant aesthetic */}
      <div 
        className="px-12 py-10 border-b-4 flex flex-col items-center text-center"
        style={{ borderColor: themeColor }}
      >
        <h1 
          className="text-4xl font-extrabold uppercase tracking-wide mb-3"
          style={{ color: themeColor }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span className="text-gray-300">|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {(personalInfo.email || personalInfo.phone) && personalInfo.location && <span className="text-gray-300">|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedinUrl || personalInfo.portfolioUrl) && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700 font-medium mt-1">
            {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl.replace('https://', '')}</span>}
            {personalInfo.linkedinUrl && personalInfo.portfolioUrl && <span className="text-gray-300">|</span>}
            {personalInfo.portfolioUrl && <span>{personalInfo.portfolioUrl.replace('https://', '')}</span>}
          </div>
        )}
      </div>

      {/* Letter Body */}
      <div className="px-12 py-12 flex-1 flex flex-col">
        
        {/* Date and Recipient Info */}
        <div className="mb-10 text-gray-800 space-y-1">
          <p className="font-medium mb-6">{currentDate}</p>
          
          {hiringManager ? (
            <p className="font-bold">{hiringManager}</p>
          ) : (
            <p className="font-bold">Hiring Manager</p>
          )}
          
          {companyName ? (
            <p className="font-bold text-gray-700">{companyName}</p>
          ) : (
             <p className="font-bold text-gray-700">[Company Name]</p>
          )}
        </div>

        {/* Generated Content */}
        <div className="prose max-w-none text-gray-800 leading-relaxed text-[15px] whitespace-pre-wrap">
          {generatedContent ? (
            generatedContent
          ) : (
            <p className="italic text-gray-400">
              Your generated cover letter will appear here... Fill out the Target Role Info in the editor and click 'Generate Cover Letter'.
            </p>
          )}
        </div>

        {/* Sign off */}
        {generatedContent && (
          <div className="mt-12 text-gray-800">
            <p className="mb-8 text-[15px]">Sincerely,</p>
            <p className="font-bold text-lg" style={{ color: themeColor }}>
              {personalInfo.fullName || 'Your Name'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CoverLetterPreview;
