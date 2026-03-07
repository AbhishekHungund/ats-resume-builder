import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid'; // need uuid for lists

const initialResumeState = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    portfolioUrl: ''
  },
  professionalSummary: '',
  workExperience: [],
  education: [],
  skills: [], // array of objects {id, text, category}
  certifications: [],
  projects: [],
  template: 'classic', // classic, modern, minimal, executive, creative
  themeColor: '#3b82f6', // default blue
  fontFamily: '"Inter", sans-serif',
  coverLetterData: {
    targetRole: '',
    companyName: '',
    hiringManager: '',
    jobDescription: '',
    generatedContent: ''
  }
};

const initialAppSettings = {
  openAiKey: '',
  documentMode: 'resume', // 'resume' | 'coverLetter'
};

export const useResumeStore = create(
  persist(
    (set) => ({
      resumeData: initialResumeState,
      appSettings: initialAppSettings,
      
      updatePersonalInfo: (data) => set((state) => ({ resumeData: { ...state.resumeData, personalInfo: { ...state.resumeData.personalInfo, ...data } } })),
      updateProfessionalSummary: (summary) => set((state) => ({ resumeData: { ...state.resumeData, professionalSummary: summary } })),
      setWorkExperience: (experience) => set((state) => ({ resumeData: { ...state.resumeData, workExperience: experience } })),
      setEducation: (education) => set((state) => ({ resumeData: { ...state.resumeData, education: education } })),
      setSkills: (skills) => set((state) => ({ resumeData: { ...state.resumeData, skills: skills } })),
      setCertifications: (certifications) => set((state) => ({ resumeData: { ...state.resumeData, certifications: certifications } })),
      setProjects: (projects) => set((state) => ({ resumeData: { ...state.resumeData, projects: projects } })),
      setTemplate: (template) => set((state) => ({ resumeData: { ...state.resumeData, template } })),
      
      updateCoverLetterData: (data) => set((state) => ({ resumeData: { ...state.resumeData, coverLetterData: { ...state.resumeData.coverLetterData, ...data } } })),
      
      setThemeColor: (color) => set((state) => ({ resumeData: { ...state.resumeData, themeColor: color } })),
      setFontFamily: (fontFamily) => set((state) => ({ resumeData: { ...state.resumeData, fontFamily } })),
      setOpenAiKey: (key) => set((state) => ({ appSettings: { ...state.appSettings, openAiKey: key } })),
      setDocumentMode: (mode) => set((state) => ({ appSettings: { ...state.appSettings, documentMode: mode } })),

      resetResume: () => set({ resumeData: initialResumeState }),
    }),
    {
      name: 'resume-builder-storage',
    }
  )
);
