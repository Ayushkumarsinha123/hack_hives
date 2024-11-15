// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import VoiceCommand from "./components/Voicecommand";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import LearningPath from "./components/LearningPath";
// import AccessibilityPopup from "./components/AccessibilityPopup";
// import { VoiceCommandProvider } from "./context/VoiceCommandContext";

// Modal.setAppElement("#root");

// const Root = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const hasVisited = localStorage.getItem("hasVisited");
//     if (!hasVisited) {
//       setShowPopup(true);
//       localStorage.setItem("hasVisited", "true");
//     }
//   }, []);

//   // Define closePopup here
//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   const handleSpeak = (text) => {
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       speechSynthesis.speak(utterance);
//     } else {
//       alert("Your browser does not support Text-to-Speech.");
//     }
//   };

//   useEffect(() => {
//     const handleClick = (event) => {
//       const target = event.target;
//       if (
//         target.tagName === "BUTTON" ||
//         target.tagName === "H2" ||
//         target.tagName === "P" ||
//         target.tagName === "SPAN"
//       ) {
//         const textContent =
//           target.innerText || target.getAttribute("aria-label");
//         if (textContent) {
//           handleSpeak(textContent);
//         }
//       }
//     };

//     document.addEventListener("click", handleClick);
//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   }, []);

//   return (
//     <VoiceCommandProvider>
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <main>
//           <Hero />
//           <div className="py-16">
//             <div className="container mx-auto">
//               <h2
//                 className="text-3xl font-bold text-center mb-12 text-gray-800"
//                 id="courses"
//               >
//                 Choose Your Learning Path
//               </h2>
//               <LearningPath />
//             </div>
//           </div>
//           <Features />
//         </main>
//         <footer className="bg-indigo-900 text-white py-8">
//           <div className="container mx-auto px-4 text-center">
//             <p>© 2024 EduAccess. Making education accessible for everyone.</p>
//           </div>
//         </footer>
//         {showPopup && <AccessibilityPopup closePopup={closePopup} />}
//       </div>
//     </VoiceCommandProvider>
//   );
// };

// const CoursesPage = () => (
//   <VoiceCommandProvider>
//     {" "}
//     {/* Wrap the Courses page in VoiceCommandProvider */}
//     <div>
//       <h1>Welcome to the Courses page!</h1>
//       <VoiceCommand /> {/* Ensure VoiceCommand is present here as well */}
//     </div>
//   </VoiceCommandProvider>
// );

// const router = createBrowserRouter([
//   { path: "/", element: <Root /> },
//   { path: "/courses", element: <CoursesPage /> },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import VoiceCommand from "./components/Voicecommand";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import LearningPath from "./components/LearningPath";
import AccessibilityPopup from "./components/AccessibilityPopup";
import { VoiceCommandProvider } from "./context/VoiceCommandContext";
import CoursesList from "./components/CoursesList";
import BlindCoursesList from "./components/BlindCoursesList";
import TextbookPage from "./components/TextbookPage";
import DeafCoursesList from "./components/DeafCoursesList";


Modal.setAppElement("#root");

const Root = () => {
  const navigate = useNavigate(); // Initialize navigate here
  const [showPopup, setShowPopup] = useState(false);

  
  const handleGetStartedClick = () => {
    navigate("/courses");
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero onGetStartedClick={handleGetStartedClick} />
        <div className="py-16">
          <div className="container mx-auto">
            <h2
              className="text-3xl font-bold text-center mb-12 text-gray-800"
              id="courses"
            >
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
      {showPopup && <AccessibilityPopup closePopup={closePopup} />}
      <VoiceCommand navigate={navigate} closePopup={closePopup} />
    </div>
  );
};

const CoursesPage = () => {
  const navigate = useNavigate(); // Initialize navigate here

  return (
    <div>
      <h1>Welcome to the Courses page!</h1>
      <VoiceCommand navigate={navigate} />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/courses",
    element: <CoursesList />,
  },{
    path: "/blind-courses",
    element: <BlindCoursesList />,
  },
  {
    path: "/textbooks",
    element: <TextbookPage />,
  },
  {
    path: "/deaf-courses",
    element: <DeafCoursesList />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <VoiceCommandProvider>
        {" "}
        {/* Now inside RouterProvider */}
        <RouterProvider router={router} />
      </VoiceCommandProvider>
    </RouterProvider>
  );
}

export default App;
