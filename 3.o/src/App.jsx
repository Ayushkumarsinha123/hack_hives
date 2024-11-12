import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import LearningPath from './components/LearningPath';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <div className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Choose Your Learning Path
            </h2>
            <LearningPath />
          </div>
        </div>
        <Features />
      </main>
      <footer className="bg-indigo-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 EduAccess. Making education accessible for everyone.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;