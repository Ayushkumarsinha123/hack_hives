import React from "react";
import { BookOpen, Ear, Eye, MessageSquare } from "lucide-react";

const paths = [
  {
    title: "Visual Learning",
    icon: Eye,
    description: "Audio descriptions and enhanced visual content",
    features: [
      "Screen reader support",
      "High contrast modes",
      "Text magnification",
    ],
  },
  {
    title: "Auditory Learning",
    icon: Ear,
    description: "Sign language and visual learning materials",
    features: ["Sign language videos", "Visual transcripts", "Closed captions"],
  },
  {
    title: "Cognitive Support",
    icon: BookOpen,
    description: "Structured and pace-controlled learning",
    features: [
      "Simplified layouts",
      "Step-by-step guides",
      "Progress tracking",
    ],
  },
  {
    title: "Communication Tools",
    icon: MessageSquare,
    description: "Alternative communication methods",
    features: [
      "Text-to-speech",
      "Speech-to-text",
      "Symbol-based communication",
    ],
  },
];

export default function LearningPath() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {paths.map((path) => (
        <div
          key={path.title}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <path.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {path.title}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">{path.description}</p>
          <ul className="space-y-2">
            {path.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center text-sm text-gray-500"
              >
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Start Learning
          </button>
        </div>
      ))}
    </div>
  );
}
