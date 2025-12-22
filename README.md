# ASL Recognition - Real-Time Sign Language Detection 🤟

<div align="center">

![ASL Recognition Banner](https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=200&fit=crop&q=80)

**A modern, AI-powered American Sign Language recognition system supporting A-Z and 0-9**

[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **Real-Time Detection**: Live webcam-based ASL recognition using TensorFlow.js
- **Full Coverage**: Supports complete alphabet (A-Z) and numbers (0-9)
- **High Accuracy**: Advanced AI model with confidence scoring
- **Word Building**: Intelligent letter buffer system for word construction
- **Instant Feedback**: Real-time visual and audio feedback

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful backdrop blur effects
- **Smooth Animations**: Floating shapes, glitch effects, and transitions
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly dark mode with vibrant accents
- **Interactive Elements**: Hover effects, pulse animations, and visual feedback

### 📊 Analytics & Monitoring
- **Live FPS Counter**: Monitor performance in real-time
- **System Logs**: Debug and track detection events
- **Detection History**: View recent recognized letters
- **Confidence Bars**: Visual representation of AI certainty

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Webcam access
- Internet connection (for CDN resources)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/asl-web-app.git
cd asl-web-app
```

2. **Open in browser**
```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

3. **Allow camera access** when prompted

4. **Click "Start Detection"** and begin signing!

---

## 📖 How to Use

### Basic Workflow

1. **Launch Application** 
   - Open `index.html` in your browser
   - Grant camera permissions

2. **Start Detection**
   - Click the "Start Detection" button
   - Wait for the model to load (first time only)

3. **Make ASL Signs**
   - Position your hand clearly in front of the camera
   - Hold each sign for 1-2 seconds
   - Watch the detected letter appear in real-time

4. **Build Words**
   - Letters are automatically added to the buffer
   - Click "Interpret Word" to finalize your word
   - Click "Clear Buffer" to start over

### 💡 Pro Tips

- **Lighting**: Use good, even lighting for best results
- **Background**: Plain, contrasting backgrounds work best
- **Distance**: Keep your hand 1-2 feet from the camera
- **Centering**: Keep your hand in the center of the frame
- **Steadiness**: Hold signs steady for consistent detection

---

## 🎓 Supported Signs

### Alphabet (A-Z)
```
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
```

### Numbers (0-9)
```
0 1 2 3 4 5 6 7 8 9
```

> **Note**: Actual supported signs depend on your trained Teachable Machine model. Update the model files to customize.

---

## 🛠️ Technology Stack

- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **AI/ML**: TensorFlow.js + Teachable Machine
- **Styling**: Modern CSS3 with animations
- **Icons**: Font Awesome 6
- **Fonts**: Inter, Space Grotesk (Google Fonts)

---

## 📁 Project Structure

```
asl-web-app/
├── index.html              # Main HTML file with modern UI
├── style.css               # Modern CSS with animations
├── README.md               # This file
├── js/
│   ├── app.js             # Main application logic
│   ├── config.js          # Configuration (supports A-Z, 0-9)
│   ├── pipeline.js        # Detection pipeline
│   ├── state.js           # State management
│   └── ui.js              # UI updates and rendering
└── my_model/              # Teachable Machine model files
    ├── model.json
    └── metadata.json
```

---

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
  --accent: #6366f1;        /* Primary color */
  --accent-strong: #818cf8;  /* Secondary color */
  --accent-glow: #a5b4fc;   /* Highlight color */
}
```

### Training Your Own Model

1. Visit [Teachable Machine](https://teachablemachine.withgoogle.com/)
2. Create an "Image Project"
3. Train your model with ASL signs
4. Export the model
5. Replace files in `my_model/` folder
6. Update `MODEL_SOURCES` in `js/config.js`

---

## 🐛 Troubleshooting

### Camera Not Working
- Ensure no other application is using the webcam
- Check browser permissions
- Try refreshing the page

### Low Accuracy
- Improve lighting conditions
- Use a plain background
- Hold signs steadily
- Ensure hand is centered in frame

### Model Not Loading
- Check internet connection (for CDN resources)
- Verify model files exist in `my_model/` folder
- Check browser console for errors

### Performance Issues
- Close unnecessary browser tabs
- Use a modern browser (Chrome recommended)
- Ensure adequate system resources

---

## 🌟 Features Showcase

### Modern Design Elements
- ✨ **Floating animated backgrounds**
- 🎭 **Glitch effect title animation**
- 💫 **Smooth fade-in animations**
- 🔮 **Glassmorphism cards**
- 🎨 **Gradient color schemes**
- ⚡ **Interactive hover effects**
- 📱 **Fully responsive design**

### User Experience
- 🎯 **Intuitive interface**
- 🔔 **Real-time feedback**
- 📊 **Visual confidence meters**
- 📝 **Comprehensive logging**
- 🎓 **Built-in ASL reference guide**
- 💡 **Pro tips and troubleshooting**

---

## 📸 Screenshots

> Add your screenshots here after deploying!

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developer

**Boni Luna**

- Portfolio: [Your Portfolio URL]
- GitHub: [@YourGitHub](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [TensorFlow.js](https://www.tensorflow.org/js) - ML framework
- [Teachable Machine](https://teachablemachine.withgoogle.com/) - Model training
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography
- [Unsplash](https://unsplash.com/) - Background images

---

## 📧 Contact

For questions, suggestions, or collaboration opportunities, please open an issue or reach out directly.

---

<div align="center">

**Made with ❤️ and AI**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/asl-web-app/issues) · [Request Feature](https://github.com/yourusername/asl-web-app/issues)

</div>
