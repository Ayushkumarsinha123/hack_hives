import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VoiceCommandContext = createContext();

export const useVoiceCommand = () => useContext(VoiceCommandContext);

export const VoiceCommandProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const startVoiceRecognition = () => {
    setIsListening(true);

    // Example transcript handler to simulate listening for a command
    const mockTranscriptHandler = (transcript) => {
      if (transcript === "Go to courses") {
        navigate("/courses");
      }
    };

    // Remove or comment this line to prevent automatic redirection
    // mockTranscriptHandler("Go to courses"); // Example transcript for testing only
  };

  // Listen for user action to start voice recognition
  useEffect(() => {
    if (isListening) {
      startVoiceRecognition();
    }
    return () => setIsListening(false);
  }, [isListening]);

  return (
    <VoiceCommandContext.Provider
      value={{ isListening, startVoiceRecognition }}
    >
      {children}
    </VoiceCommandContext.Provider>
  );
};
