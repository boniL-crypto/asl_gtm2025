# ASL Letter Recognition Web App

A browser-based ASL letter recognition system powered by **TensorFlow.js** and a **Teachable Machine** image model. The application reads live webcam input, identifies ASL letters, and builds words in real time through a simple and user-friendly interface.

Designed for local demos, academic requirements, prototypes, and lightweight kiosks.

---

## Features

- **Live webcam detection** using a Teachable Machine image classifier.
- **Real-time predictions** displayed with confidence scores.
- **Detected Letter chip** that updates instantly as the model recognizes hand signs.
- **Letter Buffer system** that stores stable letters until you convert them into a word.
- **Word interpretation workflow** using “Interpret Word” and “Clear Buffer”.
- **System indicators** for camera status, model status, and FPS.
- **Recent letters and system log panels** for transparency during detection.
- **Clean, responsive layout** built with semantic HTML and CSS.

---

## Supported Letters (Prototype)

The current model supports these sample ASL letters:

| Letter | Description |
| ------ | ----------- |
| A | Thumb up, other fingers folded |
| B | Four fingers extended, thumb across palm |
| C | Hand curved into a “C” |
| L | Thumb and index extended in an L shape |
| Y | Thumb and pinky extended, others folded |

> The list may vary depending on your custom Teachable Machine export.

---

## How to Run

1. Open the project in your browser.  
2. Allow the camera when the browser asks for permission.  
3. Click **Start Model** to activate the recognizer.  
4. Show your ASL hand signs clearly in front of the camera.  
5. Click **Interpret Word** to convert the detected letters into a full word.  
6. Click **Clear Buffer** to start collecting letters again.  
7. Refresh the page to reset the entire app.

---

## Interpreting Words

1. Watch the **Detected Letter** section to see the live recognized letter.  
2. Stable letters are added automatically to the **Current Letter Buffer**.  
3. Click **Interpret Word** to combine all buffered letters into a final word.  
4. The completed word appears in the **Word Display**.  
5. Use **Clear Buffer** to clear the buffer without interpreting a word.

---

## Debugging & Tips

- Ensure no other application or browser tab is using the webcam.  
- If the video does not appear, refresh and allow camera access again.  
- Use bright, even lighting to improve recognition accuracy.  
- Hold each hand gesture steady for a moment so the model can lock onto it.  
- Check the **System Log** panel for helpful messages during detection.

---

## Using Your Own Model

To replace the default Teachable Machine model:

1. Export your model in **TensorFlow.js** format from Teachable Machine.  
2. Place the exported files inside the **/my_model** folder.  
3. Update `MODEL_REMOTE_URL` in `script.js` to point to your model’s folder.  
4. Refresh the page and click **Start Model** to load your version.

---

## Possible Enhancements

- Add more ASL letters or expanded hand-sign datasets.  
- Improve prediction accuracy with probability thresholds or smoothing filters.  
- Add speech synthesis to speak interpreted words aloud.  
- Store completed words in local storage or send them to an API.  
- Extend support to two-hand gestures or full-sentence interpretation.

---

**Developer:** Boni Luna  
**Powered by:** Teachable Machine + TensorFlow.js
