import React from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';

const Creative = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo, professionalSummary, workExperience, education, skills, projects, certifications, themeColor, fontFamily } = resumeData;

  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedinUrl || personalInfo.portfolioUrl;

  return (
    <div className="bg-[#FAF9F6] text-slate-800 p-0 min-h-full mx-auto w-full box-border flex flex-row" style={{ fontFamily }}>
      
      {/* LEFT SIDEBAR - Dark theme for high contrast */}
      <div className="w-[35%] bg-slate-900 text-slate-300 p-8 flex flex-col min-h-[297mm]">
        
        {/* Header Name Area */}
        <div className="mb-10 text-center border-b border-slate-700 pb-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg" style={{ backgroundColor: themeColor }}>
             {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'Y'}
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-1 uppercase leading-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
          {personalInfo.jobTitle && <h2 className="text-sm font-semibold tracking-widest uppercase" style={{ color: themeColor }}>{personalInfo.jobTitle}</h2>}
        </div>

        {/* Contact Info */}
        {hasContact && (
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Contact</h3>
            <div className="space-y-3 text-[12px] font-medium text-slate-300 break-all pr-4">
              {personalInfo.phone && <div className="flex items-center gap-2"><span style={{ color: themeColor }}>📞</span> {personalInfo.phone}</div>}
              {personalInfo.email && <div className="flex items-center gap-2"><span style={{ color: themeColor }}>✉️</span> {personalInfo.email}</div>}
              {personalInfo.location && <div className="flex items-center gap-2"><span style={{ color: themeColor }}>📍</span> {personalInfo.location}</div>}
              {personalInfo.linkedinUrl && <div className="flex items-center gap-2"><span style={{ color: themeColor }}>in</span> {personalInfo.linkedinUrl}</div>}
              {personalInfo.portfolioUrl && <div className="flex items-center gap-2"><span style={{ color: themeColor }}>🔗</span> {personalInfo.portfolioUrl}</div>}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="bg-slate-800 text-slate-200 text-[11px] px-2.5 py-1 rounded-sm border border-slate-700 font-medium">
                  {s.text}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education (Sidebar location for Creative Template) */}
        {education?.length > 0 && education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Education</h3>
            <div className="space-y-5">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-3 border-l-2" style={{ borderLeftColor: themeColor }}>
                  <h4 className="font-bold text-[13px] text-white leading-tight">{edu.degree} {edu.field && <span className="font-normal block text-slate-400 text-[11px] mt-0.5">{edu.field}</span>}</h4>
                  <div className="text-[12px] text-slate-300 mt-1 font-semibold">{edu.institution}</div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block mt-0.5">{edu.graduationYear}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="w-[65%] p-8 bg-white overflow-hidden">
        
        {/* Profile Summary */}
        {professionalSummary && (
          <div className="mb-8">
            <h3 className="flex items-center text-lg font-black text-slate-800 mb-3 tracking-tight">
              <span className="w-6 h-1 mr-3 rounded-full" style={{ backgroundColor: themeColor }}></span> Profile
            </h3>
            <p className="text-[13px] leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">{professionalSummary}</p>
          </div>
        )}

        {/* Experience */}
        {workExperience?.length > 0 && workExperience.some(exp => exp.company || exp.role) && (
          <div className="mb-8">
             <h3 className="flex items-center text-lg font-black text-slate-800 mb-5 tracking-tight">
              <span className="w-6 h-1 mr-3 rounded-full" style={{ backgroundColor: themeColor }}></span> Experience
            </h3>
            <div className="space-y-6">
              {workExperience.map((exp, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="font-bold text-[15px] text-slate-900">{exp.role}</h4>
                        <div className="text-[13px] font-semibold mt-0.5" style={{ color: themeColor }}>{exp.company}{exp.location && ` • ${exp.location}`}</div>
                    </div>
                    <span className="bg-white px-2 py-1 rounded-md border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap ml-3 shadow-sm">
                      {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                    </span>
                  </div>
                  {exp.bullets?.length > 0 && exp.bullets[0] !== '' && (
                    <ul className="list-none text-[13px] text-slate-600 space-y-2 leading-relaxed mt-3">
                      {exp.bullets.filter(b => b.trim() !== '').map((bullet, idx) => (
                        <li key={idx} className="relative pl-4 before:content-['▹'] before:absolute before:left-0 before:font-bold" style={{ '--tw-before-color': themeColor, color: 'inherit' }}>
                           <span className="absolute left-0 font-bold" style={{ color: themeColor }}>▹</span> {bullet}
                        </li>
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
          <div className="mb-8">
            <h3 className="flex items-center text-lg font-black text-slate-800 mb-5 tracking-tight">
              <span className="w-6 h-1 mr-3 rounded-full" style={{ backgroundColor: themeColor }}></span> Select Work
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj, index) => (
                <div key={index} className="group border-l-4 border-slate-200 pl-4 py-1 transition-colors hover:border-l-4" style={{ borderLeftColor: themeColor }}>
                  <div className="flex justify-between items-baseline mb-1">
                     <h4 className="font-bold text-[14px] text-slate-900 transition-colors" style={{ color: themeColor }}>{proj.title}</h4>
                     {proj.link && <span className="text-[11px] text-slate-400">{proj.link}</span>}
                  </div>
                  {proj.techStack && <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: themeColor }}>{proj.techStack}</div>}
                  {proj.description && (
                    <p className="text-[13px] text-slate-600 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications (Moved to bottom right for space balancing) */}
        {certifications?.length > 0 && certifications.some(cert => cert.name) && (
          <div>
            <h3 className="flex items-center text-lg font-black text-slate-800 mb-4 tracking-tight">
              <span className="w-6 h-1 mr-3 rounded-full" style={{ backgroundColor: themeColor }}></span> Awards & Certs
            </h3>
            <div className="space-y-3">
              {certifications.filter(cert => cert.name).map((cert, index) => (
                <div key={index} className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                  <span className="text-[13px] text-slate-900 font-bold">{cert.name}</span>
                  <div className="text-right">
                      <span className="block text-[11px] text-slate-500 font-semibold">{cert.issuer}</span>
                      {cert.year && <span className="block text-[10px] text-slate-400">{cert.year}</span>}
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

export default Creative;
