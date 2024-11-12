import React, { useState, useEffect } from 'react';
import { Volume2, Mic, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const lessons = {
  mathematics: {
    title: "Introduction to Basic Mathematics",
    content: "Welcome to basic mathematics. Today we'll learn about addition and subtraction. Let's start with simple numbers. For example, 2 plus 2 equals 4.",
    sections: ["Introduction", "Addition", "Subtraction", "Practice Problems"]
  },
  science: {
    title: "Introduction to Science",
    content: "Welcome to basic science. Today we'll explore the natural world around us. We'll learn about matter and its properties.",
    sections: ["Introduction", "Matter", "Properties", "Experiments"]
  },
  history: {
    title: "World History Basics",
    content: "Welcome to world history. Today we'll explore ancient civilizations and their impact on our modern world.",
    sections: ["Introduction", "Ancient Egypt", "Ancient Greece", "Ancient Rome"]
  }
};

export default function AudioLesson() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState('mathematics');
  const [currentSection, setCurrentSection] = useState(0);
  const [speech, setSpeech] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Initialize with welcome message
  useEffect(() => {
    if (!isInitialized) {
      const welcomeMessage = new SpeechSynthesisUtterance(
        "Welcome to EduAccess. Say 'Start listening' to activate voice commands, or 'Help' to hear available commands."
      );
      window.speechSynthesis.speak(welcomeMessage);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Voice command processor
  useEffect(() => {
    const command = transcript.toLowerCase();
    
    // Help command
    if (command.includes('help')) {
      const helpMessage = new SpeechSynthesisUtterance(
        "Available commands: Start listening, Stop listening, Play lesson, Pause lesson, Next section, Previous section, Switch to mathematics, Switch to science, Switch to history, What's my progress, Help"
      );
      window.speechSynthesis.speak(helpMessage);
    }
    // Listening control
    else if (command.includes('start listening')) {
      startListening();
      announceMessage("Voice commands activated");
    }
    else if (command.includes('stop listening')) {
      SpeechRecognition.stopListening();
      announceMessage("Voice commands deactivated");
    }
    // Lesson control
    else if (command.includes('play lesson')) {
      handlePlay();
    }
    else if (command.includes('pause lesson')) {
      handlePause();
    }
    else if (command.includes('next')) {
      handleNext();
    }
    else if (command.includes('previous')) {
      handlePrevious();
    }
    // Subject switching
    else if (command.includes('switch to mathematics')) {
      handleSubjectChange('mathematics');
    }
    else if (command.includes('switch to science')) {
      handleSubjectChange('science');
    }
    else if (command.includes('switch to history')) {
      handleSubjectChange('history');
    }
    // Progress check
    else if (command.includes("what's my progress")) {
      announceProgress();
    }
  }, [transcript]);

  const announceMessage = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  const announceProgress = () => {
    const progress = `You are in ${currentLesson}, section ${currentSection + 1} of ${lessons[currentLesson].sections.length}: ${lessons[currentLesson].sections[currentSection]}`;
    announceMessage(progress);
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handlePlay = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(lessons[currentLesson].content);
    utterance.rate = 0.9;
    utterance.onend = () => {
      setIsPlaying(false);
      announceMessage("Lesson completed. Say 'next' for the next section or 'help' for more options.");
    };
    setSpeech(utterance);
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    setIsPlaying(false);
    window.speechSynthesis.cancel();
    announceMessage("Lesson paused");
  };

  const handleNext = () => {
    if (currentSection < lessons[currentLesson].sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      announceMessage(`Moving to ${lessons[currentLesson].sections[currentSection + 1]}`);
    } else {
      announceMessage("You've reached the end of this lesson");
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      announceMessage(`Moving to ${lessons[currentLesson].sections[currentSection - 1]}`);
    } else {
      announceMessage("You're at the beginning of this lesson");
    }
  };

  const handleSubjectChange = (subject) => {
    setCurrentLesson(subject);
    setCurrentSection(0);
    announceMessage(`Switched to ${subject}. Say 'play lesson' to begin.`);
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn't support speech recognition.</div>;
  }

  // The visual interface remains for sighted users or assistants
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto my-8" role="region" aria-label="Audio Lesson Player">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{lessons[currentLesson].title}</h2>
        <button
          onClick={() => listening ? SpeechRecognition.stopListening() : startListening()}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            listening ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'
          }`}
          aria-label={listening ? 'Stop voice commands' : 'Start voice commands'}
        >
          <Mic className="h-5 w-5" />
          <span>{listening ? 'Voice Commands Active' : 'Start Voice Commands'}</span>
        </button>
      </div>

      <div className="mb-6" role="navigation" aria-label="Lesson sections">
        <div className="flex space-x-4 mb-4">
          {lessons[currentLesson].sections.map((section, index) => (
            <div
              key={section}
              className={`px-4 py-2 rounded-lg ${
                currentSection === index
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              aria-current={currentSection === index ? 'step' : undefined}
            >
              {section}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6" role="group" aria-label="Playback controls">
        <button
          onClick={handlePrevious}
          className="p-3 rounded-full hover:bg-gray-100"
          aria-label="Previous section"
        >
          <SkipBack className="h-6 w-6 text-gray-700" />
        </button>

        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className="p-4 bg-indigo-600 rounded-full text-white hover:bg-indigo-700"
          aria-label={isPlaying ? 'Pause lesson' : 'Play lesson'}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8" />
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-3 rounded-full hover:bg-gray-100"
          aria-label="Next section"
        >
          <SkipForward className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="mt-6" role="complementary" aria-label="Available voice commands">
        <h3 className="font-semibold mb-2">Voice Commands:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>"Start listening" - Activate voice commands</li>
          <li>"Stop listening" - Deactivate voice commands</li>
          <li>"Play lesson" - Start the current lesson</li>
          <li>"Pause lesson" - Pause the current lesson</li>
          <li>"Next" - Go to next section</li>
          <li>"Previous" - Go to previous section</li>
          <li>"Switch to Mathematics/Science/History" - Change subject</li>
          <li>"What's my progress" - Hear current position</li>
          <li>"Help" - List all commands</li>
        </ul>
      </div>

      {transcript && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg" role="status" aria-live="polite">
          <p className="text-sm text-gray-600">Last command: {transcript}</p>
        </div>
      )}
    </div>
  );
}