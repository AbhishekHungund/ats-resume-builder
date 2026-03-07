import React from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';

const Modern = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo, professionalSummary, workExperience, education, skills, projects, certifications, themeColor, fontFamily } = resumeData;

  return (
    <div className="bg-white text-gray-800 min-h-full mx-auto w-full box-border flex flex-row shadow-sm" style={{ fontFamily }}>
      
      {/* Left Sidebar (One third) */}
      <div className="w-1/3 text-white p-8 box-border min-h-full" style={{ backgroundColor: themeColor }}>
        <h1 className="text-3xl font-extrabold uppercase tracking-wider mb-2 leading-tight">
          {personalInfo.fullName ? personalInfo.fullName.split(' ').map((n, i) => <div key={i}>{n}</div>) : 'YOUR NAME'}
        </h1>
        {personalInfo.jobTitle && <h2 className="text-md text-white/80 font-semibold mb-8">{personalInfo.jobTitle}</h2>}
        
        {/* Contact info */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3 border-b border-white/20 pb-1">Contact</h3>
          <div className="flex flex-col gap-2 text-[13px] break-all text-white/90">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedinUrl && <div>{personalInfo.linkedinUrl}</div>}
            {personalInfo.portfolioUrl && <div>{personalInfo.portfolioUrl}</div>}
          </div>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3 border-b border-white/20 pb-1">Skills</h3>
            <div className="flex flex-col gap-4 text-[13px]">
              {['Technical', 'Soft', 'Tools'].map(cat => {
                const catSkills = skills.filter(s => s.category === cat);
                if (catSkills.length === 0) return null;
                return (
                  <div key={cat}>
                    <strong className="block text-white/60 mb-1">{cat}</strong>
                    <div className="flex flex-wrap gap-1">
                      {catSkills.map(s => (
                        <span key={s.id} className="bg-white/10 px-2 py-0.5 rounded text-white font-medium">
                          {s.text}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Certifications (Sidebar fit) */}
        {certifications?.length > 0 && certifications.some(cert => cert.name) && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3 border-b border-white/20 pb-1">Certifications</h3>
            <div className="flex flex-col gap-3 text-[13px] text-white/90">
              {certifications.filter(cert => cert.name).map((cert, index) => (
                <div key={index}>
                  <div className="font-bold text-white">{cert.name}</div>
                  <div className="text-xs text-white/70">{cert.issuer} {cert.year && `• ${cert.year}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="w-2/3 p-8 box-border">
        {/* Summary */}
        {professionalSummary && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Profile</h3>
            <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap">{professionalSummary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience?.length > 0 && workExperience.some(exp => exp.company || exp.role) && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b pb-1">Experience</h3>
            <div className="space-y-5">
              {workExperience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-[15px] text-gray-900">{exp.role}</h4>
                      <div className="font-medium text-[14px]" style={{ color: themeColor }}>{exp.company}</div>
                    </div>
                    <div className="text-[12px] text-gray-500 font-medium text-right mt-1">
                      {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                    </div>
                  </div>
                  {exp.bullets?.length > 0 && exp.bullets[0] !== '' && (
                    <ul className="list-disc list-outside ml-4 mt-2 text-[13px] text-gray-700 space-y-1">
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

        {/* Projects */}
        {projects?.length > 0 && projects.some(proj => proj.title) && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b pb-1">Projects</h3>
            <div className="space-y-4">
              {projects.map((proj, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                     <h4 className="font-bold text-[14px] text-gray-900">{proj.title}</h4>
                     {proj.link && <span className="text-[12px]" style={{ color: themeColor }}>{proj.link}</span>}
                  </div>
                  {proj.techStack && <div className="text-[12px] text-gray-500 font-medium mb-1">{proj.techStack}</div>}
                  {proj.description && (
                    <p className="text-[13px] text-gray-700 leading-relaxed text-justify">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b pb-1">Education</h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-[14px] text-gray-900">{edu.institution}</h4>
                    <div className="text-[12px] text-gray-500 font-medium whitespace-nowrap">{edu.graduationYear}</div>
                  </div>
                  <div className="text-[13px] text-gray-700">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                    {edu.gpa && <span className="text-gray-500 ml-2">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Modern;
