import { useState, useEffect, useRef, useCallback } from 'react';

// FIX: Add type definitions for the Web Speech API to resolve TypeScript errors.
// These interfaces provide types for the non-standard SpeechRecognition API.
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  onstart: () => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionStatic {
  new(): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

// The SpeechRecognition interface is vendor-prefixed in some browsers.
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const isSupported = !!SpeechRecognition;

/**
 * A custom hook for handling voice search functionality using the Web Speech API.
 * @param onResult - A callback function that is invoked with the final transcript.
 * @returns An object containing the listening state, any errors, a function to
 *          toggle listening, and a boolean indicating if the API is supported.
 */
export const useVoiceSearch = (onResult: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!isSupported) {
      setError("Voice search is not supported by your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop listening after the user stops speaking
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        setError("Couldn't hear you. Please try again.");
      } else if (event.error === 'not-allowed') {
        setError("Microphone permission denied. Please enable it in your browser settings.");
      } else {
        setError(`An error occurred: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      // Get the transcript from the last result
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      onResult(transcript);
    };

    recognitionRef.current = recognition;

    // Cleanup: stop recognition if the component unmounts
    return () => {
      recognition.stop();
    };
  }, [onResult]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  }, [isListening]);

  return { isListening, error, toggleListening, isSupported };
};
