/**
 * NurAI — Speech Engine
 * TTS: Web Speech API (window.speechSynthesis)
 * STT: Web Speech API (window.SpeechRecognition / webkitSpeechRecognition)
 */

(function (global) {
  'use strict';

  class SpeechEngine {
    constructor() {
      this.synth = global.speechSynthesis || null;
      this.recognition = null;
      this.isReading = false;
      this.isListening = false;
      this.enabled = true;          // user can toggle TTS off
      this._voices = [];
      this._currentUtterance = null;
      this._onReadStart = null;
      this._onReadEnd = null;

      this._initVoices();
      this._initSTT();
    }

    /* ── TTS ─────────────────────────────── */

    _initVoices() {
      if (!this.synth) return;
      const load = () => { this._voices = this.synth.getVoices(); };
      load();
      if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
        speechSynthesis.onvoiceschanged = load;
      }
    }

    _pickVoice() {
      // Prefer Uzbek → Russian → first available
      return (
        this._voices.find(v => v.lang.startsWith('uz')) ||
        this._voices.find(v => v.lang.startsWith('ru')) ||
        this._voices[0] ||
        null
      );
    }

    /**
     * Speak the given text.
     * @param {string}   text
     * @param {Function} [onStart]
     * @param {Function} [onEnd]
     * @returns {SpeechSynthesisUtterance|null}
     */
    speak(text, onStart, onEnd) {
      if (!this.synth || !this.enabled || !text) return null;

      this.stop();

      const utt = new SpeechSynthesisUtterance(text.trim());
      utt.lang   = 'uz-UZ';
      utt.rate   = 0.92;
      utt.pitch  = 1;
      utt.volume = 1;

      const v = this._pickVoice();
      if (v) utt.voice = v;

      utt.onstart = () => {
        this.isReading = true;
        if (onStart)        onStart();
        if (this._onReadStart) this._onReadStart(text);
      };

      utt.onend = utt.onerror = () => {
        this.isReading = false;
        if (onEnd)        onEnd();
        if (this._onReadEnd)  this._onReadEnd();
      };

      this._currentUtterance = utt;
      this.synth.speak(utt);
      return utt;
    }

    stop() {
      if (this.synth && this.synth.speaking) {
        this.synth.cancel();
      }
      this.isReading = false;
    }

    toggle() {
      this.enabled = !this.enabled;
      if (!this.enabled) this.stop();
      return this.enabled;
    }

    /* ── STT ─────────────────────────────── */

    _initSTT() {
      const SR = global.SpeechRecognition || global.webkitSpeechRecognition;
      if (!SR) return;

      this.recognition = new SR();
      this.recognition.lang = 'uz-UZ';
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
    }

    /**
     * Start microphone listening.
     * @param {Function} onResult  (transcript: string, isFinal: boolean) => void
     * @param {Function} [onEnd]   () => void
     * @param {Function} [onError] (errorMsg: string) => void
     */
    startListening(onResult, onEnd, onError) {
      if (!this.recognition) {
        onError && onError('Brauzeringiz ovozni tanishni qo\'llab-quvvatlamaydi');
        return;
      }

      this.recognition.onresult = (e) => {
        let interim = '';
        let final   = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) final += t;
          else                      interim += t;
        }
        onResult && onResult(final || interim, !!final);
      };

      this.recognition.onend   = () => { this.isListening = false; onEnd && onEnd(); };
      this.recognition.onerror = (e) => { this.isListening = false; onError && onError(e.error); };

      try {
        this.recognition.start();
        this.isListening = true;
      } catch (err) {
        onError && onError(err.message);
      }
    }

    stopListening() {
      if (this.recognition && this.isListening) {
        this.recognition.stop();
      }
    }

    /* ── Support check ───────────────────── */

    support() {
      return {
        tts: !!this.synth,
        stt: !!this.recognition
      };
    }
  }

  global.NurSpeech = new SpeechEngine();

}(window));
