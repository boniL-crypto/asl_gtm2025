import {defaultWebcamMessage, logLimit} from './config.js';

const elements = {
  detectedLetter: document.getElementById('detected-letter'),
  interpretBtn: document.getElementById('interpret-btn'),
  clearBtn: document.getElementById('clear-buffer'),
  startModelBtn: document.getElementById('start-model'),
  wordDisplay: document.getElementById('word-display'),
  letterBuffer: document.getElementById('letter-buffer'),
  letterHistory: document.getElementById('letter-history'),
  labelContainer: document.getElementById('label-container'),
  webcamContainer: document.getElementById('webcam-container'),
  logPanel: document.getElementById('system-log'),
  overlayStatus: document.getElementById('overlay-status'),
  cameraStatus: document.getElementById('camera-status'),
  detectionStatus: document.getElementById('detection-status'),
  fpsValue: document.getElementById('fps-value')
};

let topPredictionNode = null;

export {elements};

export function logEvent(message) {
  if (!elements.logPanel) return;
  console.log(message);
  if (elements.logPanel.firstElementChild && elements.logPanel.firstElementChild.classList.contains('placeholder')) {
    elements.logPanel.innerHTML = '';
  }
  const entry = document.createElement('p');
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  elements.logPanel.prepend(entry);
  while (elements.logPanel.children.length > logLimit) {
    elements.logPanel.removeChild(elements.logPanel.lastChild);
  }
}

export function updateStatusPill(element, text, variant) {
  if (!element) return;
  element.textContent = text;
  element.className = `status-pill ${variant}`;
}

export function updateBufferDisplay(buffer = []) {
  if (!elements.letterBuffer) return;
  elements.letterBuffer.textContent = buffer.length ? buffer.join(' • ') : '(empty)';
}

export function renderLetterHistory(history = []) {
  if (!elements.letterHistory) return;
  elements.letterHistory.innerHTML = '';
  if (!history.length) {
    const placeholder = document.createElement('li');
    placeholder.className = 'placeholder';
    placeholder.textContent = 'No letters detected yet.';
    elements.letterHistory.appendChild(placeholder);
    return;
  }
  history.forEach((letter) => {
    const li = document.createElement('li');
    li.textContent = letter;
    elements.letterHistory.appendChild(li);
  });
}

export function updateWordDisplay(word) {
  if (!elements.wordDisplay) return;
  elements.wordDisplay.textContent = word || '(empty)';
}

export function setDetectedLetter(letter) {
  if (!elements.detectedLetter) return;
  elements.detectedLetter.textContent = letter || '-';
}

export function updateFpsDisplay(value) {
  if (!elements.fpsValue) return;
  elements.fpsValue.textContent = value;
}

export function setOverlayStatus(message) {
  if (!elements.overlayStatus) return;
  elements.overlayStatus.textContent = message;
}

export function setPredictionPlaceholder(message) {
  if (!elements.labelContainer) return;
  elements.labelContainer.innerHTML = `<div class="placeholder">${message}</div>`;
  topPredictionNode = null;
}

export function buildPredictionUI(hasMetadata) {
  if (!elements.labelContainer) return;
  elements.labelContainer.innerHTML = '';
  topPredictionNode = null;
  if (!hasMetadata) {
    setPredictionPlaceholder('Model metadata missing.');
    return;
  }
  const wrapper = document.createElement('div');
  wrapper.className = 'prediction-item';

  const row = document.createElement('div');
  row.className = 'prediction-row';
  const nameSpan = document.createElement('span');
  nameSpan.className = 'prediction-name';
  nameSpan.textContent = '-';
  const valueSpan = document.createElement('span');
  valueSpan.className = 'prediction-value';
  valueSpan.textContent = '0%';
  row.append(nameSpan, valueSpan);

  const bar = document.createElement('div');
  bar.className = 'prediction-bar';
  const fill = document.createElement('span');
  fill.style.width = '0%';
  bar.appendChild(fill);

  wrapper.append(row, bar);
  elements.labelContainer.appendChild(wrapper);
  topPredictionNode = {nameSpan, valueSpan, fill};
}

export function updatePredictionUI(prediction) {
  if (!topPredictionNode) return;
  if (!prediction) {
    topPredictionNode.nameSpan.textContent = '-';
    topPredictionNode.valueSpan.textContent = '0%';
    topPredictionNode.fill.style.width = '0%';
    return;
  }
  const percent = (prediction.probability * 100).toFixed(1);
  topPredictionNode.nameSpan.textContent = prediction.className;
  topPredictionNode.valueSpan.textContent = `${percent}%`;
  topPredictionNode.fill.style.width = `${Math.min(100, percent)}%`;
}

export function setWebcamPlaceholder(message = defaultWebcamMessage) {
  if (!elements.webcamContainer) return;
  elements.webcamContainer.innerHTML = `<div class="webcam-placeholder">${message}</div>`;
  elements.webcamContainer.classList.remove('webcam-shell--active');
}

export function activateWebcam(canvas) {
  if (!elements.webcamContainer || !canvas) return;
  elements.webcamContainer.innerHTML = '';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  elements.webcamContainer.appendChild(canvas);
  elements.webcamContainer.classList.add('webcam-shell--active');
}
