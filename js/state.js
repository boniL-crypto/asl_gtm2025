import {appConfig} from './config.js';

class StableLetterTracker {
  constructor(requiredFrames = 5) {
    this.requiredFrames = requiredFrames;
    this.currentLetter = null;
    this.count = 0;
    this.lastReported = null;
  }

  push(letter) {
    if (!letter) {
      this.reset();
      return null;
    }

    if (letter === this.currentLetter) {
      this.count += 1;
    } else {
      this.currentLetter = letter;
      this.count = 1;
    }

    if (this.count >= this.requiredFrames && this.lastReported !== letter) {
      this.lastReported = letter;
      return letter;
    }
    return null;
  }

  reset() {
    this.currentLetter = null;
    this.count = 0;
    this.lastReported = null;
  }
}

const stabilizer = new StableLetterTracker(appConfig.stableFrames);
let letterBuffer = [];
let letterHistory = [];

export function pushLetterToBuffer(letter) {
  if (!letter) return false;
  const last = letterBuffer[letterBuffer.length - 1];
  if (last === letter) return false;
  if (letterBuffer.length >= appConfig.bufferLimit) {
    letterBuffer.shift();
  }
  letterBuffer.push(letter);
  letterHistory.unshift(letter);
  if (letterHistory.length > appConfig.historyLimit) {
    letterHistory.pop();
  }
  return true;
}

export function resetBuffer() {
  letterBuffer = [];
}

export function resetHistory() {
  letterHistory = [];
}

export function getLetterBuffer() {
  return [...letterBuffer];
}

export function getLetterHistory() {
  return [...letterHistory];
}

export function getWordFromBuffer() {
  return letterBuffer.join('');
}

export function resetState() {
  resetBuffer();
  resetHistory();
  stabilizer.reset();
}

export {stabilizer};
