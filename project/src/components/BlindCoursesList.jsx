// BlindCoursesList.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlindCoursesList = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const courses = [
    {
      title: "Audio test Books",
      description: "audio eBooks",
      audioFile: "/download.mp3", // Ensure this file path is correct
      externalLink: "https://alison.com/tag/sign-language",
    },
    {
      title: "Textbooks",
      description: "Course on using software that reads text aloud for the visually impaired.",
      externalLink: "https://www.coursera.org/learn/teach-children-with-visual-impairment",
      isTextbook: true, // Identify as the course for opening the TextbookPage
    },
  ];

  const handleCourseClick = (course) => {
    if (course.isTextbook) {
      // Navigate to the Textbook page route
      navigate("/textbooks");
    } else if (course.audioFile) {
      // Handle audio playback
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = course.audioFile;
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Audio playback failed:", error));
      }
    } else {
      // Text-to-speech for other courses
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(course.title);
        window.speechSynthesis.speak(utterance);
      }
      window.open(course.externalLink, "_blank");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white text-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Courses for Blind Students
      </h2>
      <ul
        role="list"
        aria-label="List of courses for visually impaired students"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
      >
        {courses.map((course, index) => (
          <li
            key={index}
            onClick={() => handleCourseClick(course)}
            className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer hover:bg-gray-700"
            aria-label={`Click to learn more about ${course.title}`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100">
                {course.title}
              </h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">{course.description}</p>
          </li>
        ))}
      </ul>

      {/* Hidden audio element to play local audio */}
      <audio ref={audioRef} hidden onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default BlindCoursesList;
