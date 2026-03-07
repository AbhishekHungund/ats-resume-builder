import React, { useState } from 'react';
import { Hammer, X, Plus } from 'lucide-react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { v4 as uuidv4 } from 'uuid';

const Skills = () => {
  const { resumeData, setSkills } = useResumeStore();
  const skills = resumeData.skills || [];
  
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('Technical');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setSkills([...skills, { id: uuidv4(), text: inputValue.trim(), category }]);
    setInputValue('');
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const categories = ['Technical', 'Soft', 'Tools'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 flex items-center gap-3 border-b border-gray-200">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Hammer className="text-blue-600" size={20} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Skills</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-3 mb-6">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-50 border border-gray-300 rounded-lg px-3 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-700 outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="flex-1 flex items-center gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. React, Communication, Git..."
              className="flex-1 bg-slate-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-sm font-semibold flex items-center gap-1"
            >
              <Plus size={20} /> <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </form>

        <div className="space-y-5">
          {categories.map(cat => {
            const catSkills = skills.filter(s => s.category === cat);
            if (catSkills.length === 0) return null;
            return (
              <div key={cat}>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>{cat}</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {catSkills.map(skill => (
                    <div key={skill.id} className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
                      {skill.text}
                      <button 
                        type="button"
                        onClick={() => removeSkill(skill.id)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-0.5 rounded-full transition-colors flex items-center justify-center bg-slate-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
