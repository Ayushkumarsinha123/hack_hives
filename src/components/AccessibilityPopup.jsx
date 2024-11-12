import React, { useEffect, useState } from "react";

export default function AccessibilityPopup({ closePopup }) {
  const [hasSpoken, setHasSpoken] = useState(false); // Track if speech has been played

  const handleButtonClick = (value) => {
    document.cookie = `userAccessibility=${value}; path=/; max-age=${
      60 * 60 * 24 * 30
    }`;
    localStorage.setItem("userAccessibility", value);
    closePopup();
  };

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  // Speak buttons' text only once
  useEffect(() => {
    if (!hasSpoken) {
      const buttonLabels = [
        "Visual",
        "Auditory",
        "Cognitive",
        "Motor Impairments",
      ];
      buttonLabels.forEach((label) => speakText(label));
      setHasSpoken(true); // Set flag to prevent future speech
    }
  }, [hasSpoken]); // Only run if `hasSpoken` changes

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-xs text-center">
        <h2 className="text-2xl font-bold mb-4">
          Choose Your Accessibility Option
        </h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleButtonClick("visual")}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Visual
          </button>
          <button
            onClick={() => handleButtonClick("auditory")}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Auditory
          </button>
          <button
            onClick={() => handleButtonClick("cognitive")}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Cognitive
          </button>
          <button
            onClick={() => handleButtonClick("motor")}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Motor Impairments
          </button>
        </div>
      </div>
    </div>
  );
}
