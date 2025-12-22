export const appConfig = {
  stableFrames: 6,
  bufferLimit: 24,
  historyLimit: 12,
  confidenceThreshold: 0.82
};

// Model supports full ASL alphabet (A-Z) and numbers (0-9)
export const SUPPORTED_SIGNS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

export const MODEL_SOURCES = [
  'https://teachablemachine.withgoogle.com/models/ZkUaBWDkD/',
  './my_model/'
];

export const tmCameraConfig = {
  width: 320,
  height: 240,
  flip: true
};

export const defaultWebcamMessage = 'Click "Start Detection" to activate your camera and begin recognizing ASL signs.';
export const logLimit = 8;
