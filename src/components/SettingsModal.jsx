import React from 'react';
import { useResumeStore } from '../hooks/useResumeStore';
import { Settings, X, Key, Palette, Type } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SettingsModal = ({ isOpen, onClose }) => {
  const { resumeData, appSettings, setThemeColor, setFontFamily, setOpenAiKey } = useResumeStore();

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Slate', value: '#475569' },
  ];

  const fonts = [
    { name: 'Inter (Clean)', value: '"Inter", sans-serif' },
    { name: 'Roboto (Standard)', value: '"Roboto", sans-serif' },
    { name: 'Georgia (Classic)', value: '"Georgia", serif' },
    { name: 'Merriweather (Elegant)', value: '"Merriweather", serif' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Settings size={20} className="text-gray-500" /> App Settings
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* OpenAI Key */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
              <Key size={16} className="text-indigo-500" /> AI Features
            </h3>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              Enter your OpenAI API key to unlock AI bullet generation, grammar tracking, and automated cover letters. Your key is stored locally in your browser and never sent to our servers.
            </p>
            <input 
              type="password"
              placeholder="sk-..."
              value={appSettings.openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-gray-400 font-mono"
            />
          </section>

          {/* Theme Color */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
              <Palette size={16} className="text-rose-500" /> Accent Color
            </h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setThemeColor(c.value)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${resumeData.themeColor === c.value ? 'border-gray-800 scale-110 shadow-md' : 'border-transparent'}`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {resumeData.themeColor === c.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-gray-500">Custom Hex:</span>
              <input 
                type="text" 
                value={resumeData.themeColor} 
                onChange={(e) => setThemeColor(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs w-24 font-mono text-gray-700"
              />
            </div>
          </section>

          {/* Typography */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
              <Type size={16} className="text-blue-500" /> Resume Font
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fonts.map(font => (
                <button
                  key={font.name}
                  onClick={() => setFontFamily(font.value)}
                  className={`px-4 py-3 rounded-xl border text-left transition-all ${resumeData.fontFamily === font.value ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <span className="block text-sm font-medium text-gray-800" style={{ fontFamily: font.value }}>{font.name.split(' ')[0]}</span>
                  <span className="block text-xs text-gray-500 mt-1">{font.name.split(' ')[1].replace(/[()]/g, '')}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-3">Note: Changing fonts works best with the Classic or Minimal templates.</p>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={() => {
              toast.success('Settings saved!');
              onClose();
            }}
            className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
