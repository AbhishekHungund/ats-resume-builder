import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';

const Education = () => {
  const { resumeData, setEducation } = useResumeStore();
  const education = resumeData.education || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = education.findIndex((item) => item.id === active.id);
      const newIndex = education.findIndex((item) => item.id === over.id);
      setEducation(arrayMove(education, oldIndex, newIndex));
    }
  };

  const addEducation = () => {
    setEducation([...education, { 
      id: uuidv4(), 
      institution: '', 
      degree: '', 
      field: '', 
      graduationYear: '', 
      gpa: '' 
    }]);
  };

  const updateEducation = (id, field, value) => {
    setEducation(education.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeEducation = (id) => {
    if(window.confirm('Remove this education entry?')) {
      setEducation(education.filter(item => item.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <GraduationCap className="text-blue-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Education</h2>
        </div>
        <button 
          onClick={addEducation}
          className="flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-white bg-blue-100 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors border border-blue-200 hover:border-transparent"
        >
          <Plus size={16} /> Add 
        </button>
      </div>
      
      <div className="p-6">
        {education.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
             <GraduationCap className="text-gray-300 mb-2" size={32} />
             <p className="text-gray-500 font-medium">No education history added.</p>
             <button onClick={addEducation} className="mt-3 text-blue-600 font-bold hover:underline">Add Education</button>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={education.map(e => e.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-6">
                {education.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    <button 
                      onClick={() => removeEducation(item.id)}
                      className="absolute right-3 top-3 bg-red-100 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-200 z-20"
                      title="Remove Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Institution</label>
                        <input 
                          type="text" 
                          value={item.institution} 
                          onChange={(e) => updateEducation(item.id, 'institution', e.target.value)}
                          placeholder="e.g. University of California, Berkeley"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Degree</label>
                        <input 
                          type="text" 
                          value={item.degree} 
                          onChange={(e) => updateEducation(item.id, 'degree', e.target.value)}
                          placeholder="e.g. Bachelor of Science"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Field of Study</label>
                        <input 
                          type="text" 
                          value={item.field} 
                          onChange={(e) => updateEducation(item.id, 'field', e.target.value)}
                          placeholder="e.g. Computer Science"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Graduation Year</label>
                        <input 
                          type="text" 
                          value={item.graduationYear} 
                          onChange={(e) => updateEducation(item.id, 'graduationYear', e.target.value)}
                          placeholder="e.g. 2024"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">GPA (Optional)</label>
                        <input 
                          type="text" 
                          value={item.gpa} 
                          onChange={(e) => updateEducation(item.id, 'gpa', e.target.value)}
                          placeholder="e.g. 3.8/4.0"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
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

export default Education;
