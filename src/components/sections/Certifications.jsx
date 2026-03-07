import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { v4 as uuidv4 } from 'uuid';

const Certifications = () => {
  const { resumeData, setCertifications } = useResumeStore();
  const certs = resumeData.certifications || [];

  const addCert = () => {
    setCertifications([...certs, { id: uuidv4(), name: '', issuer: '', year: '' }]);
  };

  const updateCert = (id, field, value) => {
    setCertifications(certs.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCert = (id) => {
    if(window.confirm('Remove this certification?')) {
      setCertifications(certs.filter(c => c.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Award className="text-blue-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Certifications</h2>
        </div>
        <button 
          onClick={addCert}
          className="flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-white bg-blue-100 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors border border-blue-200 hover:border-transparent"
        >
          <Plus size={16} /> Add 
        </button>
      </div>
      
      <div className="p-6">
        {certs.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
             <Award className="text-gray-300 mb-2" size={32} />
             <p className="text-gray-500 font-medium">No certifications added yet.</p>
             <button onClick={addCert} className="mt-3 text-blue-600 font-bold hover:underline">Add your first certification</button>
          </div>
        ) : (
          <div className="space-y-6">
            {certs.map((cert) => (
              <div key={cert.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-5 group">
                <button 
                  onClick={() => removeCert(cert.id)}
                  className="absolute -right-3 -top-3 bg-red-100 text-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-200"
                  title="Remove Certification"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Certification Name</label>
                    <input 
                      type="text" 
                      value={cert.name} 
                      onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Issuer / Organization</label>
                    <input 
                      type="text" 
                      value={cert.issuer} 
                      onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Year</label>
                    <input 
                      type="text" 
                      value={cert.year} 
                      onChange={(e) => updateCert(cert.id, 'year', e.target.value)}
                      placeholder="e.g. 2023"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
