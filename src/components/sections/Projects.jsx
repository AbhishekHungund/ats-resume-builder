import React from 'react';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';

const Projects = () => {
  const { resumeData, setProjects } = useResumeStore();
  const projects = resumeData.projects || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex((item) => item.id === active.id);
      const newIndex = projects.findIndex((item) => item.id === over.id);
      setProjects(arrayMove(projects, oldIndex, newIndex));
    }
  };

  const addProject = () => {
    setProjects([...projects, { 
      id: uuidv4(), 
      title: '', 
      description: '', 
      techStack: '', 
      link: '' 
    }]);
  };

  const updateProject = (id, field, value) => {
    setProjects(projects.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeProject = (id) => {
    if(window.confirm('Remove this project?')) {
      setProjects(projects.filter(item => item.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FolderGit2 className="text-blue-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Projects</h2>
        </div>
        <button 
          onClick={addProject}
          className="flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-white bg-blue-100 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors border border-blue-200 hover:border-transparent"
        >
          <Plus size={16} /> Add 
        </button>
      </div>
      
      <div className="p-6">
        {projects.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
             <FolderGit2 className="text-gray-300 mb-2" size={32} />
             <p className="text-gray-500 font-medium">No projects added yet.</p>
             <button onClick={addProject} className="mt-3 text-blue-600 font-bold hover:underline">Add Project</button>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-6">
                {projects.map((project) => (
                  <SortableItem key={project.id} id={project.id}>
                    <button 
                      onClick={() => removeProject(project.id)}
                      className="absolute right-3 top-3 bg-red-100 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-200 z-20"
                      title="Remove Project"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Title</label>
                        <input 
                          type="text" 
                          value={project.title} 
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          placeholder="e.g. E-Commerce Platform"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link / URL (Optional)</label>
                        <input 
                          type="text" 
                          value={project.link} 
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          placeholder="e.g. github.com/my-project"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tech Stack</label>
                        <input 
                          type="text" 
                          value={project.techStack} 
                          onChange={(e) => updateProject(project.id, 'techStack', e.target.value)}
                          placeholder="e.g. React, Node.js, MongoDB"
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description (1-2 sentences)</label>
                        <textarea 
                          value={project.description} 
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          placeholder="Built a full-stack platform processing 10k monthly orders..."
                          rows={3}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y custom-scrollbar"
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

export default Projects;
