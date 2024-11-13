import React from "react";
import { useNavigate } from "react-router-dom";

const CoursesList = () => {
  const navigate = useNavigate();

  const courses = [
    {
      title: "Blind person",
      description: "Courses tailored for visually impaired students.",
      externalLink: "internal", // Navigate to BlindCoursesList internally
    },
    {
      title: "Deaf person",
      description: "Courses tailored for hearing impaired students.",
      externalLink: "internal1", // Navigate to DeafCoursesList internally
    },
  ];

  const handleCourseClick = (course) => {
    // Trigger text-to-speech for course title
    const utterance = new SpeechSynthesisUtterance(course.title);
    window.speechSynthesis.speak(utterance);

    // Determine the navigation based on the externalLink value
    if (course.externalLink === "internal") {
      navigate("/blind-courses"); // Redirect to BlindCoursesList
    } else if (course.externalLink === "internal1") {
      navigate("/deaf-courses"); // Redirect to DeafCoursesList
    } else {
      // Open external link in a new tab for other courses
      window.open(course.externalLink, "_blank");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white text-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Courses for Disabled Students
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {courses.map((course, index) => (
          <li
            key={index}
            onClick={() => handleCourseClick(course)} // Pass entire course object
            className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer hover:bg-gray-700"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <svg
                  className="h-6 w-6 text-indigo-600"
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
    </div>
  );
};

export default CoursesList;
