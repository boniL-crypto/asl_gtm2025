import {
  elements,
  logEvent,
  updateBufferDisplay,
  renderLetterHistory,
  updateWordDisplay,
  setPredictionPlaceholder,
  setWebcamPlaceholder,
  setDetectedLetter
} from './ui.js';
import {
  getLetterBuffer,
  getLetterHistory,
  getWordFromBuffer,
  resetBuffer,
  stabilizer
} from './state.js';
import {startPipeline, pipelineBusy} from './pipeline.js';

function handleInterpretWord() {
  const word = getWordFromBuffer();
  updateWordDisplay(word);
  logEvent(`Word interpreted: ${word || 'empty buffer'}`);
  resetBuffer();
  renderLetterHistory(getLetterHistory());
  updateBufferDisplay(getLetterBuffer());
  stabilizer.reset();
  setDetectedLetter('-');
}

function handleClearBuffer() {
  resetBuffer();
  updateWordDisplay('(empty)');
  renderLetterHistory(getLetterHistory());
  updateBufferDisplay(getLetterBuffer());
  stabilizer.reset();
  setDetectedLetter('-');
  logEvent('Buffer cleared manually.');
}

async function handleStartModel() {
  if (pipelineBusy()) {
    logEvent('Model is already running or loading.');
    return;
  }

  const btn = elements.startModelBtn;
  if (!btn) return;
  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = 'Loading…';

  try {
    await startPipeline();
    btn.textContent = 'Running';
  } catch (error) {
    console.error(error);
    btn.disabled = false;
    btn.textContent = originalLabel || 'Start Model';
  }
}

function bindEvents() {
  elements.interpretBtn?.addEventListener('click', handleInterpretWord);
  elements.clearBtn?.addEventListener('click', handleClearBuffer);
  elements.startModelBtn?.addEventListener('click', handleStartModel);
}

function initializeUI() {
  renderLetterHistory(getLetterHistory());
  updateBufferDisplay(getLetterBuffer());
  updateWordDisplay('(empty)');
  setPredictionPlaceholder('Click “Start Model” to stream predictions.');
  setWebcamPlaceholder();
  setDetectedLetter('-');
  logEvent('Script initialized. Click Start Model to begin.');
}

bindEvents();
initializeUI();
window.init = handleStartModel;
