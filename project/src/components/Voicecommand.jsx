import React, { useState, useEffect } from "react";

const VoiceCommand = ({ handleSpeak }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");

  // Check if the SpeechRecognition API is available in the browser
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  // Initialize SpeechRecognition
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Keep listening until stopped
  recognition.lang = "en-US"; // Language for recognition
  recognition.interimResults = false; // Get only final results

  // Handle voice commands
  const handleVoiceCommand = (command) => {
    if (
      command.toLowerCase().includes("start the voice command") &&
      !isListening
    ) {
      handleSpeak("Voice command started");
      setIsListening(true); // Start active listening mode
    } else if (
      command.toLowerCase().includes("stop the voice command") &&
      isListening
    ) {
      handleSpeak("Voice command stopped");
      setIsListening(false); // Stop active listening mode
    } else if (isListening) {
      // Additional commands processed only when in active listening mode
      if (command.toLowerCase().includes("learn path")) {
        handleSpeak("Navigating to learning path section");
      } else if (command.toLowerCase().includes("audio lessons")) {
        handleSpeak("Navigating to audio lessons section");
      }
    }
  };

  // Event listener for recognition result
  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    setTranscription(transcript);
    handleVoiceCommand(transcript);
  };

  // Handle errors in speech recognition
  recognition.onerror = (event) => {
    console.error("Speech Recognition Error: ", event.error);
  };

  // Effect to manage recognition state
  useEffect(() => {
    if (isListening) {
      recognition.start(); // Start listening when "start" command is given
    } else {
      recognition.stop(); // Stop listening when "stop" command is given
    }
    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return (
    <div className="voice-command">
      <button
        onClick={() => setIsListening(!isListening)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p className="mt-4">
        {transcription
          ? `You said: ${transcription}`
          : 'Listening for "start the voice command"...'}
      </p>
    </div>
  );
};

export default VoiceCommand;
