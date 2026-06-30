/**
 * speech.js — TTS & STT utilities using Web Speech API
 * NurAI Platform
 */

const Speech = (() => {
  /* ---- Text-to-Speech ---- */
  let currentUtterance = null;
  let isSpeaking = false;

  function speak(text, { rate = 0.95, pitch = 1, volume = 1, lang = 'uz-UZ', onStart, onEnd, onError } = {}) {
    if (!window.speechSynthesis) {
      console.warn('TTS not supported in this browser.');
      if (onError) onError('TTS not supported');
      return;
    }

    // Cancel any ongoing speech
    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      isSpeaking = true;
      if (onStart) onStart();
    };
    utterance.onend = () => {
      isSpeaking = false;
      currentUtterance = null;
      if (onEnd) onEnd();
    };
    utterance.onerror = (e) => {
      isSpeaking = false;
      currentUtterance = null;
      if (onError) onError(e.error);
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      currentUtterance = null;
    }
  }

  function pause() {
    if (window.speechSynthesis && isSpeaking) window.speechSynthesis.pause();
  }

  function resume() {
    if (window.speechSynthesis) window.speechSynthesis.resume();
  }

  function isSupported() {
    return 'speechSynthesis' in window;
  }

  function isSpeakingNow() { return isSpeaking; }

  /* ---- Speech-to-Text ---- */
  let recognition = null;
  let isListening = false;

  function sttSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  function startListening({ lang = 'uz-UZ', continuous = false, onResult, onEnd, onError } = {}) {
    if (!sttSupported()) {
      if (onError) onError('STT not supported');
      return;
    }
    if (isListening) stopListening();

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(r => r[0].transcript)
        .join(' ')
        .trim();
      if (onResult) onResult(transcript);
    };

    recognition.onend = () => {
      isListening = false;
      if (onEnd) onEnd();
    };

    recognition.onerror = (e) => {
      isListening = false;
      if (onError) onError(e.error);
    };

    recognition.start();
    isListening = true;
  }

  function stopListening() {
    if (recognition) {
      recognition.abort();
      recognition = null;
      isListening = false;
    }
  }

  function isListeningNow() { return isListening; }

  return {
    speak, stop, pause, resume,
    isSupported, isSpeakingNow,
    startListening, stopListening,
    sttSupported, isListeningNow,
  };
})();

window.Speech = Speech;
