// DeafCoursesList.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeafCoursesList = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const courses = [
    {
      title: "Introduction to Sign Language",
      description: "Learn basic sign language to communicate effectively.",
      externalLink: "https://www.example.com/sign-language",
      audioFile: null, // No audio for this course
    },
    {
      title: "Lip Reading Skills",
      description: "Develop skills for lip reading to improve communication.",
      externalLink: "https://www.example.com/lip-reading",
      audioFile: null, // No audio for this course
    },
    {
      title: "Communication Devices for Deaf",
      description: "Overview of devices that assist communication for the deaf.",
      externalLink: "https://www.example.com/communication-devices",
      audioFile: null, // No audio for this course
    },
    {
      title: "Advanced Sign Language",
      description: "Enhance your sign language skills with this advanced course.",
      audioFile: "/download.mp3", // Optional: Add audio description if needed
      isAdvanced: true,
    },
  ];

  const handleCourseClick = (course) => {
    if (course.audioFile) {
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
      // Open external link in a new tab for non-audio courses
      window.open(course.externalLink, "_blank");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Courses for Deaf Students
      </h2>
      <ul
        role="list"
        aria-label="List of courses for hearing-impaired students"
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

      {/* Hidden audio element for optional audio playback */}
      <audio ref={audioRef} hidden onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default DeafCoursesList;
