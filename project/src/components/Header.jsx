import React from "react";
import { BookOpen, Settings, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-indigo-700 text-white py-4">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8" />
          <span className="text-2xl font-bold">EduAccess</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 hover:text-indigo-200">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
