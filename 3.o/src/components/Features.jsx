import React from 'react';
import { Volume2, Type, Languages, Brain } from 'lucide-react';

export default function Features() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Accessibility Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Volume2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Text-to-Speech</h3>
            <p className="text-gray-600">
              Natural voice narration for all content with adjustable speed and pitch
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Type className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Font Customization</h3>
            <p className="text-gray-600">
              Adjustable text size, spacing, and dyslexia-friendly fonts
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Languages className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Language</h3>
            <p className="text-gray-600">
              Integrated sign language videos for all learning materials
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cognitive Tools</h3>
            <p className="text-gray-600">
              Focus mode, reading guides, and simplified layouts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}