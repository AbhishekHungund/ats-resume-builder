import React from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';

const Classic = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo, professionalSummary, workExperience, education, skills, projects, certifications, themeColor, fontFamily } = resumeData;

  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedinUrl || personalInfo.portfolioUrl;

  return (
    <div className="bg-white text-black p-10 min-h-full leading-relaxed mx-auto w-full box-border" style={{ fontFamily }}>
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-1" style={{ color: themeColor }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
        {personalInfo.jobTitle && <h2 className="text-lg font-medium mb-1">{personalInfo.jobTitle}</h2>}
        
        {hasContact && (
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-sm text-gray-800">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {(personalInfo.email && personalInfo.phone) && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {((personalInfo.email || personalInfo.phone) && personalInfo.location) && <span>•</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            
            {((personalInfo.email || personalInfo.phone || personalInfo.location) && (personalInfo.linkedinUrl || personalInfo.portfolioUrl)) && <span>•</span>}
            
            {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
            {(personalInfo.linkedinUrl && personalInfo.portfolioUrl) && <span>•</span>}
            {personalInfo.portfolioUrl && <span>{personalInfo.portfolioUrl}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {professionalSummary && (
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase border-b pb-0.5 mb-2" style={{ color: themeColor, borderColor: themeColor }}>Professional Summary</h3>
          <p className="text-[13px] text-justify whitespace-pre-wrap">{professionalSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience?.length > 0 && workExperience.some(exp => exp.company || exp.role) && (
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase border-b pb-0.5 mb-3" style={{ color: themeColor, borderColor: themeColor }}>Work Experience</h3>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-[14px]">{exp.role}</span>
                    {exp.role && exp.company && <span>, </span>}
                    <span className="italic text-[14px]">{exp.company}</span>
                  </div>
                  <div className="text-[13px]">
                    {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate} {exp.location && `| ${exp.location}`}
                  </div>
                </div>
                {exp.bullets?.length > 0 && exp.bullets[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 text-[13px] space-y-1">
                    {exp.bullets.filter(b => b.trim() !== '').map((bullet, idx) => (
                      <li key={idx} className="pl-1 text-justify">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase border-b pb-0.5 mb-3" style={{ color: themeColor, borderColor: themeColor }}>Education</h3>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[14px]">{edu.institution}</span>
                  {(edu.degree || edu.field) && <span className="text-[14px]"> — {edu.degree} {edu.field && `in ${edu.field}`}</span>}
                </div>
                <div className="text-[13px] text-right whitespace-nowrap ml-4">
                  {edu.graduationYear}
                  {edu.gpa && <span> | GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && projects.some(proj => proj.title) && (
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase border-b pb-0.5 mb-3" style={{ color: themeColor, borderColor: themeColor }}>Projects</h3>
          <div className="space-y-3">
            {projects.map((proj, index) => (
              <div key={index}>
                <div className="font-bold text-[14px] mb-1">
                  {proj.title}
                  {proj.techStack && <span className="font-normal italic"> | {proj.techStack}</span>}
                  {proj.link && <span className="font-normal text-[13px]"> | {proj.link}</span>}
                </div>
                {proj.description && (
                  <p className="text-[13px] text-justify">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase border-b pb-0.5 mb-2" style={{ color: themeColor, borderColor: themeColor }}>Skills</h3>
          <div className="text-[13px]">
             {['Technical', 'Soft', 'Tools'].map(cat => {
               const catSkills = skills.filter(s => s.category === cat);
               if (catSkills.length === 0) return null;
               return (
                 <div key={cat} className="mb-1">
                   <strong className="mr-2">{cat}:</strong>
                   <span>{catSkills.map(s => s.text).join(', ')}</span>
                 </div>
               );
             })}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && certifications.some(cert => cert.name) && (
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase border-b pb-0.5 mb-2" style={{ color: themeColor, borderColor: themeColor }}>Certifications</h3>
          <ul className="list-disc list-outside ml-4 text-[13px] space-y-1">
            {certifications.filter(cert => cert.name).map((cert, index) => (
              <li key={index} className="pl-1">
                <span className="font-bold">{cert.name}</span>
                {cert.issuer && <span> — {cert.issuer}</span>}
                {cert.year && <span> ({cert.year})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Classic;
