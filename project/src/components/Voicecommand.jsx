import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VoiceCommand = ({ handleSpeak }) => {
  const [isListening, setIsListening] = useState(true);
  const [transcription, setTranscription] = useState("");
  const isRecognitionActive = useRef(false); // Ref to avoid re-renders
  const recognitionStarting = useRef(false); // Tracks if `start` is in progress
  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  if (!recognitionRef.current) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        console.log(transcript);

        // Implement voice to command
        if (transcript.trim() === "go to courses") {
          navigate("/courses");
        }
      }
      setTranscription(transcript);
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error: ", event.error);
    };

    recognition.onstart = () => {
      isRecognitionActive.current = true;
      recognitionStarting.current = false;
    };

    recognition.onend = () => {
      isRecognitionActive.current = false;
      if (isListening && !recognitionStarting.current) {
        recognitionStarting.current = true;
        setTimeout(() => recognition.start(), 500);
      }
    };

    recognitionRef.current = recognition;
  }

  const handleVoiceCommand = (command) => {
    if (
      command.toLowerCase().includes("start the voice command") &&
      !isListening
    ) {
      handleSpeak("Voice command started");
      setIsListening(true);
    } else if (
      command.toLowerCase().includes("stop the voice command") &&
      isListening
    ) {
      handleSpeak("Voice command stopped");
      setIsListening(false);
    } else if (isListening) {
      if (command.toLowerCase().includes("learn path")) {
        handleSpeak("Navigating to learning path section");
      } else if (command.toLowerCase().includes("audio lessons")) {
        handleSpeak("Navigating to audio lessons section");
      }
    }
  };

  useEffect(() => {
    const recognition = recognitionRef.current;

    if (
      isListening &&
      !isRecognitionActive.current &&
      !recognitionStarting.current
    ) {
      recognitionStarting.current = true;
      try {
        recognition.start();
      } catch (error) {
        console.warn("Recognition start error:", error);
        recognitionStarting.current = false;
      }
    } else if (!isListening && isRecognitionActive.current) {
      recognition.stop();
    }

    return () => {
      if (isRecognitionActive.current) recognition.stop();
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
