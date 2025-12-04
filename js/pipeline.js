import {appConfig, MODEL_SOURCES, tmCameraConfig} from './config.js';
import {
  elements,
  logEvent,
  updateStatusPill,
  updateBufferDisplay,
  renderLetterHistory,
  setDetectedLetter,
  updateFpsDisplay,
  setOverlayStatus,
  setPredictionPlaceholder,
  buildPredictionUI,
  updatePredictionUI,
  setWebcamPlaceholder,
  activateWebcam
} from './ui.js';
import {
  stabilizer,
  pushLetterToBuffer,
  getLetterBuffer,
  getLetterHistory,
  resetState
} from './state.js';

let tmModel = null;
let tmWebcam = null;
let animationFrameId = null;
let lastFrameTimestamp = performance.now();
let isModelRunning = false;
let isModelLoading = false;

function extractLetter(className = '') {
  const trimmed = className.trim();
  if (!trimmed) return null;
  if (trimmed.length === 1) return trimmed.toUpperCase();
  const letters = trimmed.match(/[a-z]/gi);
  return letters && letters.length ? letters[0].toUpperCase() : trimmed.toUpperCase();
}

function updateFps() {
  const now = performance.now();
  const delta = now - lastFrameTimestamp;
  lastFrameTimestamp = now;
  const fps = (1000 / delta).toFixed(1);
  updateFpsDisplay(isFinite(fps) ? fps : '0');
}

async function loadModelWithFallback() {
  let lastError = null;
  for (const source of MODEL_SOURCES) {
    if (!source) continue;
    try {
      const modelURL = `${source}model.json`;
      const metadataURL = `${source}metadata.json`;
      const model = await window.tmImage.load(modelURL, metadataURL);
      const label = source.startsWith('http') ? 'remote Teachable Machine' : 'local /my_model export';
      return {model, label};
    } catch (error) {
      lastError = error;
      console.error(`Failed to load model from ${source}`, error);
      logEvent(`Model load failed for ${source} (${error.message}).`);
    }
  }
  throw lastError || new Error('Unable to load Teachable Machine model.');
}

async function setupWebcam() {
  tmWebcam = new window.tmImage.Webcam(tmCameraConfig.width, tmCameraConfig.height, tmCameraConfig.flip);
  await tmWebcam.setup();
  await tmWebcam.play();
  activateWebcam(tmWebcam.canvas);
  updateStatusPill(elements.cameraStatus, 'Online', 'online');
  setOverlayStatus('Camera streaming');
  logEvent('Webcam ready.');
}

function teardownWebcam(message) {
  if (tmWebcam && typeof tmWebcam.stop === 'function') {
    tmWebcam.stop();
  }
  tmWebcam = null;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  isModelRunning = false;
  if (message) {
    setWebcamPlaceholder(message);
  }
}

function handlePredictions(predictions = []) {
  if (!predictions.length) {
    updateStatusPill(elements.detectionStatus, 'No predictions', 'idle');
    setOverlayStatus('Waiting for model output…');
    updatePredictionUI(null);
    setDetectedLetter('-');
    stabilizer.reset();
    return;
  }

  const best = predictions.reduce((prev, current) => (current.probability > prev.probability ? current : prev));
  updatePredictionUI(best);
  const candidateLetter = best.probability >= appConfig.confidenceThreshold ? extractLetter(best.className) : null;
  setDetectedLetter(candidateLetter);

  if (!candidateLetter) {
    updateStatusPill(elements.detectionStatus, 'Scanning', 'idle');
    setOverlayStatus('Low confidence gesture');
    stabilizer.push(null);
    return;
  }

  updateStatusPill(elements.detectionStatus, 'Tracking', 'active');
  setOverlayStatus('Gesture detected');
  const stableLetter = stabilizer.push(candidateLetter);
  if (stableLetter) {
    if (pushLetterToBuffer(stableLetter)) {
      updateBufferDisplay(getLetterBuffer());
      renderLetterHistory(getLetterHistory());
      logEvent(`Letter locked: ${stableLetter}`);
    }
  }
}

async function predictFrame() {
  if (!tmModel || !tmWebcam) return;
  const predictions = await tmModel.predict(tmWebcam.canvas);
  updateFps();
  handlePredictions(predictions);
}

async function loop() {
  if (!tmModel || !tmWebcam) return;
  tmWebcam.update();
  await predictFrame();
  animationFrameId = window.requestAnimationFrame(loop);
}

export function pipelineBusy() {
  return isModelRunning || isModelLoading;
}

export async function startPipeline() {
  if (pipelineBusy()) {
    logEvent('Model already running or loading.');
    return;
  }
  if (!window.tmImage) {
    throw new Error('Teachable Machine library not loaded.');
  }

  try {
    isModelLoading = true;
    updateStatusPill(elements.cameraStatus, 'Requesting', 'idle');
    updateStatusPill(elements.detectionStatus, 'Loading model', 'idle');
    setOverlayStatus('Loading Teachable Machine model…');
    logEvent('Loading Teachable Machine model…');

    const {model, label} = await loadModelWithFallback();
    tmModel = model;
    const totalClasses = tmModel.getTotalClasses();
    buildPredictionUI(totalClasses > 0);
    logEvent(`Model ready (${totalClasses} classes) from ${label}.`);

    await setupWebcam();
    resetState();
    updateBufferDisplay(getLetterBuffer());
    renderLetterHistory(getLetterHistory());
    setDetectedLetter('-');
    updatePredictionUI(null);

    isModelRunning = true;
    isModelLoading = false;
    logEvent('Starting Teachable Machine loop.');
    animationFrameId = window.requestAnimationFrame(loop);
  } catch (error) {
    isModelLoading = false;
    teardownWebcam('Camera unavailable. Click “Start Model” to try again.');
    setPredictionPlaceholder('Unable to load predictions.');
    updateStatusPill(elements.cameraStatus, 'Error', 'offline');
    updateStatusPill(elements.detectionStatus, 'Error', 'offline');
    setOverlayStatus('Initialization error');
    logEvent('Model initialization failed. Check console for details.');
    throw error;
  }
}

export function stopPipeline(message) {
  teardownWebcam(message);
  tmModel = null;
  updateStatusPill(elements.cameraStatus, 'Idle', 'idle');
  updateStatusPill(elements.detectionStatus, 'Idle', 'idle');
  setDetectedLetter('-');
  setPredictionPlaceholder('Click “Start Model” to stream predictions.');
  setOverlayStatus('Pipeline stopped');
}
