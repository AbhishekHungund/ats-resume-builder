import React from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';

const Executive = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo, professionalSummary, workExperience, education, skills, projects, certifications, themeColor, fontFamily } = resumeData;

  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedinUrl || personalInfo.portfolioUrl;

  return (
    <div className="bg-white text-gray-900 p-10 min-h-full mx-auto w-full box-border" style={{ fontFamily }}>
      
      {/* Header - Authoritative & Centered */}
      <div className="mb-8 border-b-2 pb-6 text-center" style={{ borderColor: themeColor }}>
        <h1 className="text-[32px] font-bold tracking-tight mb-2" style={{ color: themeColor }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
        {personalInfo.jobTitle && <h2 className="text-[16px] font-semibold text-slate-700 uppercase tracking-widest mb-3">{personalInfo.jobTitle}</h2>}
        
        {hasContact && (
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[12px] text-slate-600 font-sans">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {(personalInfo.email && personalInfo.phone) && <span>|</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {((personalInfo.email || personalInfo.phone) && personalInfo.location) && <span>|</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {((personalInfo.email || personalInfo.phone || personalInfo.location) && personalInfo.linkedinUrl) && <span>|</span>}
            {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
          </div>
        )}
      </div>

      {/* Summary - Prominent for Executives */}
      {professionalSummary && (
        <div className="mb-8">
          <h3 className="text-[14px] font-bold uppercase tracking-widest mb-3 border-b border-slate-300 pb-1" style={{ color: themeColor }}>Executive Summary</h3>
          <p className="text-[13px] leading-relaxed text-slate-700 whitespace-pre-wrap">{professionalSummary}</p>
        </div>
      )}

      {/* Core Competencies (Skills) - Lifted to top for Executives */}
      {skills?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[14px] font-bold uppercase tracking-widest mb-3 border-b border-slate-300 pb-1" style={{ color: themeColor }}>Core Competencies</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-slate-700 leading-relaxed font-sans">
            {skills.map((s, i) => (
              <div key={i} className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: themeColor }}></span>
                {s.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience?.length > 0 && workExperience.some(exp => exp.company || exp.role) && (
        <div className="mb-8">
          <h3 className="text-[14px] font-bold uppercase tracking-widest mb-4 border-b border-slate-300 pb-1" style={{ color: themeColor }}>Professional Experience</h3>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-end mb-1">
                  <h4 className="font-bold text-[15px] text-slate-900">{exp.company}{exp.location && <span className="text-slate-500 font-normal">, {exp.location}</span>}</h4>
                  <span className="text-[12px] font-semibold text-slate-600 font-sans">
                    {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                  </span>
                </div>
                <div className="text-[14px] font-medium text-slate-800 flex justify-between mb-2">
                   <span>{exp.role}</span>
                </div>
                {exp.bullets?.length > 0 && exp.bullets[0] !== '' && (
                  <ul className="list-disc ml-5 text-[13px] text-slate-700 space-y-1.5 leading-relaxed font-sans">
                    {exp.bullets.filter(b => b.trim() !== '').map((bullet, idx) => (
                      <li key={idx} className="pl-1">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects - Optional for Executives, but included if data exists */}
      {projects?.length > 0 && projects.some(proj => proj.title) && (
        <div className="mb-8">
          <h3 className="text-[14px] font-bold uppercase tracking-widest mb-4 border-b border-slate-300 pb-1" style={{ color: themeColor }}>Key Initiatives & Projects</h3>
          <div className="space-y-5">
            {projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-bold text-[14px] text-slate-900">{proj.title}</h4>
                   {proj.link && <span className="text-[11px] font-sans" style={{ color: themeColor }}>{proj.link}</span>}
                </div>
                {proj.techStack && <div className="text-[12px] italic mb-1.5" style={{ color: themeColor }}>{proj.techStack}</div>}
                {proj.description && (
                  <p className="text-[13px] text-slate-700 leading-relaxed font-sans">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-8">
          <h3 className="text-[14px] font-bold uppercase tracking-widest mb-4 border-b border-slate-300 pb-1" style={{ color: themeColor }}>Education</h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-[14px] text-slate-900">{edu.institution}</h4>
                    <div className="text-[13px] text-slate-700 mt-0.5 font-sans">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[12px] font-semibold text-slate-600 block font-sans">{edu.graduationYear}</span>
                    {edu.gpa && <span className="text-[12px] text-slate-500 font-sans mt-0.5 block">GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && certifications.some(cert => cert.name) && (
        <div>
          <h3 className="text-[14px] font-bold uppercase tracking-widest mb-3 border-b border-slate-300 pb-1" style={{ color: themeColor }}>Certifications & Accolades</h3>
          <div className="grid grid-cols-2 gap-4">
            {certifications.filter(cert => cert.name).map((cert, index) => (
              <div key={index} className="text-[13px] font-sans">
                <span className="text-slate-900 font-semibold block">{cert.name}</span>
                <span className="text-slate-600">{cert.issuer} {cert.year && `• ${cert.year}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Executive;
