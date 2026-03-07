import React from 'react';
import { User } from 'lucide-react';
import { useResumeStore } from '../../hooks/useResumeStore';

const PersonalInfo = () => {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const data = resumeData.personalInfo || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 flex items-center gap-3 border-b border-gray-200">
        <div className="bg-blue-100 p-2 rounded-lg">
          <User className="text-blue-600" size={20} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={data.fullName || ''} 
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Title</label>
            <input 
              type="text" 
              name="jobTitle"
              value={data.jobTitle || ''} 
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input 
              type="email" 
              name="email"
              value={data.email || ''} 
              onChange={handleChange}
              placeholder="e.g. jane.doe@example.com"
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
            <input 
              type="tel" 
              name="phone"
              value={data.phone || ''} 
              onChange={handleChange}
              placeholder="e.g. +1 (555) 123-4567"
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
            <input 
              type="text" 
              name="location"
              value={data.location || ''} 
              onChange={handleChange}
              placeholder="e.g. New York, NY"
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">LinkedIn URL</label>
            <input 
              type="text" 
              name="linkedinUrl"
              value={data.linkedinUrl || ''} 
              onChange={handleChange}
              placeholder="e.g. linkedin.com/in/janedoe"
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Portfolio / Website</label>
            <input 
              type="text" 
              name="portfolioUrl"
              value={data.portfolioUrl || ''} 
              onChange={handleChange}
              placeholder="e.g. janedoe.com or github.com/janedoe"
              className="w-full bg-slate-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
