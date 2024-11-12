import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import VoiceCommand from "./components/Voicecommand.jsx";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import LearningPath from "./components/LearningPath";
import AudioLesson from "./components/AudioLesson";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VoiceCommandProvider } from "./context/VoiceCommandContext.jsx";

Modal.setAppElement("#root"); // Required for react-modal

const Root = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show modal on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsModalOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  // Function to handle Text-to-Speech for a given text
  const handleSpeak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support Text-to-Speech.");
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;

      // Check if the clicked element is a button or has text content
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "H2" ||
        target.tagName === "P" ||
        target.tagName === "SPAN"
      ) {
        const textContent =
          target.innerText || target.getAttribute("aria-label");
        if (textContent) {
          handleSpeak(textContent);
        }
      }
    };

    // Attach click event listener to the document
    document.addEventListener("click", handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <VoiceCommandProvider>
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
              {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Listen to Learning Path
              </button> */}
            </div>
          </div>
          {/* <div className="py-16 bg-gray-100">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Audio Lessons
              </h2>
              {/* <AudioLesson /> */}
          {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Listen to Audio Lessons
              </button> */}
          {/* </div> */}
          {/* </div> */}
          <Features />
        </main>
        <footer className="bg-indigo-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 EduAccess. Making education accessible for everyone.</p>
          </div>
        </footer>
      </div>

      {/* <VoiceCommand handleSpeak={handleSpeak} /> */}
    </VoiceCommandProvider>
  );
};

// Define router with routes for each page
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/courses",
    element: <div>Welcome to the Courses page!</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
