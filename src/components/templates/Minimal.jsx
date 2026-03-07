import React from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';

const Minimal = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo, professionalSummary, workExperience, education, skills, projects, certifications, themeColor, fontFamily } = resumeData;

  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedinUrl || personalInfo.portfolioUrl;

  return (
    <div className="bg-white text-gray-900 font-sans p-10 min-h-full mx-auto w-full box-border" style={{ fontFamily }}>
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-light tracking-widest text-gray-900 mb-2 uppercase">{personalInfo.fullName || 'YOUR NAME'}</h1>
        {personalInfo.jobTitle && <h2 className="text-sm tracking-[0.2em] font-medium uppercase mb-4" style={{ color: themeColor }}>{personalInfo.jobTitle}</h2>}
        
        {hasContact && (
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs tracking-wide text-gray-500">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedinUrl && <span>{personalInfo.linkedinUrl}</span>}
            {personalInfo.portfolioUrl && <span>{personalInfo.portfolioUrl}</span>}
          </div>
        )}
      </div>

      <div className="w-8 mx-auto border-t mb-10" style={{ borderColor: themeColor }}></div>

      {/* Summary */}
      {professionalSummary && (
        <div className="mb-10 text-center px-8">
          <p className="text-[13px] leading-relaxed text-gray-600 mb-0 whitespace-pre-wrap">{professionalSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience?.length > 0 && workExperience.some(exp => exp.company || exp.role) && (
        <div className="mb-10">
          <div className="flex items-start mb-6">
            <h3 className="w-1/4 text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Experience</h3>
            <div className="w-3/4 space-y-8 border-l pl-6 relative" style={{ borderColor: themeColor }}>
              {workExperience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute w-2 h-2 rounded-full -left-[28px] top-1.5 ring-4 ring-white" style={{ backgroundColor: themeColor }}></div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-semibold text-[14px] text-gray-900">{exp.role}</h4>
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                      {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[13px] text-gray-500 mb-2 italic">{exp.company}{exp.location && ` • ${exp.location}`}</div>
                  {exp.bullets?.length > 0 && exp.bullets[0] !== '' && (
                    <ul className="list-disc ml-4 text-[13px] text-gray-600 space-y-1.5 leading-relaxed">
                      {exp.bullets.filter(b => b.trim() !== '').map((bullet, idx) => (
                        <li key={idx} className="pl-2">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && projects.some(proj => proj.title) && (
        <div className="mb-10">
          <div className="flex items-start mb-6">
            <h3 className="w-1/4 text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Projects</h3>
            <div className="w-3/4 space-y-6 border-l pl-6 relative" style={{ borderColor: themeColor }}>
              {projects.map((proj, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                     <h4 className="font-semibold text-[14px] text-gray-900">{proj.title}</h4>
                     {proj.link && <span className="text-[11px]" style={{ color: themeColor }}>{proj.link}</span>}
                  </div>
                  {proj.techStack && <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">{proj.techStack}</div>}
                  {proj.description && (
                    <p className="text-[13px] text-gray-600 leading-relaxed max-w-full break-words">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && education.some(edu => edu.institution || edu.degree) && (
        <div className="mb-10">
          <div className="flex items-start mb-6">
            <h3 className="w-1/4 text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Education</h3>
            <div className="w-3/4 space-y-5 border-l pl-6 relative" style={{ borderColor: themeColor }}>
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-[14px] text-gray-900">{edu.institution}</h4>
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{edu.graduationYear}</span>
                  </div>
                  <div className="text-[13px] text-gray-600">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                    {edu.gpa && <span className="text-gray-400 ml-2">| GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills & Certs Row */}
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Skills */}
        {skills?.length > 0 && (
          <div className="flex-1">
            <div className="flex items-start">
              <div className="w-1/4 sm:w-1/3 text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Skills</div>
              <div className="w-3/4 sm:w-2/3 border-l pl-6 text-[13px] text-gray-600 leading-relaxed space-y-2 relative" style={{ borderColor: themeColor }}>
                {['Technical', 'Soft', 'Tools'].map(cat => {
                 const catSkills = skills.filter(s => s.category === cat);
                 if (catSkills.length === 0) return null;
                 return (
                   <div key={cat}>
                     <span className="font-medium mr-2" style={{ color: themeColor }}>{cat}:</span>
                     <span>{catSkills.map(s => s.text).join(', ')}</span>
                   </div>
                 );
               })}
              </div>
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && certifications.some(cert => cert.name) && (
          <div className="flex-1">
            <div className="flex items-start">
              <div className="w-1/4 sm:w-1/3 text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Certs</div>
              <div className="w-3/4 sm:w-2/3 border-l pl-6 text-[13px] text-gray-600 space-y-2 relative" style={{ borderColor: themeColor }}>
                {certifications.filter(cert => cert.name).map((cert, index) => (
                  <div key={index}>
                    <span className="font-medium block" style={{ color: themeColor }}>{cert.name}</span>
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider">{cert.issuer} {cert.year && `• ${cert.year}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Minimal;
