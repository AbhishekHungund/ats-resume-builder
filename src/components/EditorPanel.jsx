import React from 'react';
import ATSScore from './ATSScore';
import JobMatcher from './sections/JobMatcher';
import PersonalInfo from './sections/PersonalInfo';
import ProfessionalSummary from './sections/ProfessionalSummary';
import WorkExperience from './sections/WorkExperience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import CoverLetterEditor from './CoverLetterEditor';
import { useResumeStore } from '../hooks/useResumeStore';

const EditorPanel = () => {
  const { appSettings } = useResumeStore();
  const { documentMode } = appSettings;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto custom-scrollbar relative z-10 w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {documentMode === 'coverLetter' ? 'Cover Letter Builder' : 'Resume Editor'}
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          {documentMode === 'coverLetter' 
            ? 'Generate a tailored cover letter using AI based on your resume data and target role.'
            : 'Fill out the sections below. Changes are saved automatically and previewed in real-time.'}
        </p>
      </div>
      
      {documentMode === 'coverLetter' ? (
        <CoverLetterEditor />
      ) : (
        <>
          <ATSScore />
          <JobMatcher />
          <PersonalInfo />
          <ProfessionalSummary />
          <WorkExperience />
          <Education />
          <Skills />
          <Projects />
          <Certifications />
        </>
      )}
      
      <div className="h-20"></div>
    </div>
  );
};

export default EditorPanel;
