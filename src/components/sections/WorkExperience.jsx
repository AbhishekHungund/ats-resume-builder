import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, X, Sparkles, Loader2 } from 'lucide-react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import { generateResumeBullets } from '../../services/aiService';
import toast from 'react-hot-toast';

const WorkExperience = () => {
  const { resumeData, setWorkExperience } = useResumeStore();
  const experiences = resumeData.workExperience || [];
  const [generatingId, setGeneratingId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = experiences.findIndex((item) => item.id === active.id);
      const newIndex = experiences.findIndex((item) => item.id === over.id);
      setWorkExperience(arrayMove(experiences, oldIndex, newIndex));
    }
  };

  const addExperience = () => {
    setWorkExperience([...experiences, { 
      id: uuidv4(), 
      company: '', 
      role: '', 
      startDate: '', 
      endDate: '', 
      location: '', 
      bullets: [''] 
    }]);
  };

  const updateExperience = (id, field, value) => {
    setWorkExperience(experiences.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const updateBullet = (expId, bulletIndex, value) => {
    setWorkExperience(experiences.map(exp => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIndex] = value;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  const addBullet = (expId) => {
    setWorkExperience(experiences.map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: [...(exp.bullets || []), ''] };
      }
      return exp;
    }));
  };

  const removeBullet = (expId, bulletIndex) => {
    setWorkExperience(experiences.map(exp => {
      if (exp.id === expId) {
        const newBullets = exp.bullets.filter((_, idx) => idx !== bulletIndex);
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  const removeExperience = (id) => {
    if(window.confirm('Remove this work experience?')) {
      setWorkExperience(experiences.filter(item => item.id !== id));
    }
  };

  const handleGenerateBullets = async (exp) => {
    if (!exp.role) {
      toast.error('Please enter a Role / Job Title first to generate bullets.');
      return;
    }
    
    setGeneratingId(exp.id);
    const toastId = toast.loading('Generating perfect bullet points...');
    
    try {
      const newBullets = await generateResumeBullets(exp.role, exp.company);
      
      setWorkExperience(experiences.map(item => {
        if (item.id === exp.id) {
          return { ...item, bullets: newBullets };
        }
        return item;
      }));
      
      toast.success('Bullets generated successfully!', { id: toastId });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Briefcase className="text-blue-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Work Experience</h2>
        </div>
        <button 
          onClick={addExperience}
          className="flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-white bg-blue-100 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors border border-blue-200 hover:border-transparent"
        >
          <Plus size={16} /> Add 
        </button>
      </div>
      
      <div className="p-6">
        {experiences.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
             <Briefcase className="text-gray-300 mb-2" size={32} />
             <p className="text-gray-500 font-medium">No work experience added.</p>
             <button onClick={addExperience} className="mt-3 text-blue-600 font-bold hover:underline">Add Experience</button>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={experiences.map(e => e.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <SortableItem key={exp.id} id={exp.id}>
                    <button 
                      onClick={() => removeExperience(exp.id)}
                      className="absolute right-3 top-3 bg-red-100 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-200 z-20"
                      title="Remove Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company</label>
                        <input 
                          type="text" 
                          value={exp.company} 
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Google"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role / Job Title</label>
                        <input 
                          type="text" 
                          value={exp.role} 
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                        <input 
                          type="text" 
                          value={exp.startDate} 
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          placeholder="e.g. Jan 2020"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                        <input 
                          type="text" 
                          value={exp.endDate} 
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          placeholder="e.g. Present"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                        <input 
                          type="text" 
                          value={exp.location} 
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. Mountain View, CA"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2 mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-semibold text-gray-700">Bullet Points</label>
                          <button 
                            onClick={() => handleGenerateBullets(exp)}
                            disabled={generatingId === exp.id}
                            className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-2 py-1 rounded transition-colors disabled:opacity-50"
                            title="Auto-generate impressive bullets with AI"
                          >
                            {generatingId === exp.id ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                            Auto-Generate
                          </button>
                        </div>
                        <div className="space-y-3">
                          {(exp.bullets || []).map((bullet, bIndex) => (
                            <div key={bIndex} className="flex gap-2 items-start">
                              <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 border border-transparent"></div>
                              <textarea 
                                value={bullet}
                                onChange={(e) => updateBullet(exp.id, bIndex, e.target.value)}
                                placeholder="Achieved X by implementing Y which led to Z% improvement..."
                                rows={2}
                                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y text-sm custom-scrollbar"
                              />
                              <button 
                                onClick={() => removeBullet(exp.id, bIndex)}
                                disabled={(exp.bullets || []).length <= 1}
                                className="mt-1 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors bg-slate-100 p-1.5 rounded-lg shrink-0"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => addBullet(exp.id)}
                          className="mt-3 flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Plus size={16} /> Add Bullet Point
                        </button>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default WorkExperience;
