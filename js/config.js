export const appConfig = {
  stableFrames: 6,
  bufferLimit: 24,
  historyLimit: 8,
  confidenceThreshold: 0.82
};

export const MODEL_SOURCES = [
  'https://teachablemachine.withgoogle.com/models/ZkUaBWDkD/',
  './my_model/'
];

export const tmCameraConfig = {
  width: 320,
  height: 240,
  flip: true
};

export const defaultWebcamMessage = 'Click “Start Model” to load your Teachable Machine classifier.';
export const logLimit = 6;
