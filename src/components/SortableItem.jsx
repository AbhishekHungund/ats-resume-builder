import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.9 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative bg-slate-50 border rounded-xl p-5 group transition-shadow ${isDragging ? 'shadow-xl border-blue-400 bg-white ring-2 ring-blue-500/20' : 'border-slate-200'}`}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-blue-500 cursor-grab active:cursor-grabbing opacity-50 group-hover:opacity-100 transition-opacity rounded-md hover:bg-slate-200"
      >
        <GripVertical size={20} />
      </div>
      <div className="pl-6">
        {children}
      </div>
    </div>
  );
};
