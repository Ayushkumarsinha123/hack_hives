import React from "react";

export default function AccessibilityPopup({ closePopup }) {
  const handleButtonClick = (value) => {
    // Set a cookie with the value of the button clicked
    document.cookie = `userAccessibility=${value}; path=/; max-age=${
      60 * 60 * 24 * 30
    }`; // 30 days
    closePopup(); // Close the popup after setting the cookie
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
