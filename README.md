# Visual Prompt Engineer

An elegant, AI-powered tool that analyzes a target image and reverse-engineers a highly detailed textual prompt. Designed specifically for advanced image generators (like Midjourney, DALL·E 3, or Stable Diffusion), it helps you achieve style transfer, pose replication, and identity preservation based on any reference photograph.

## 🎯 Core Use Cases

### Style & Aesthetic Cloning
Reverse-engineer film grades, specific lighting conditions, and artistic palettes from any professional photo.

### Pose & Composition Transfer
Extract camera angles, framing (e.g., chiaroscuro close-up, low-angle full-body), and human postures to recreate them with precision.

### Identity-Preserving Generations
Generate prompts that explicitly instruct downstream AI models to keep a target subject's facial consistency and skin detail.

## ⚡ Key Features

### Dual-Engine Architecture
Built with an elegant Vite + React 19 interface powered by the latest Gemini 2.5 Flash model for lightning-fast visual analysis.

### Cyberpunk Twilight Theme
Hand-crafted, modern high-contrast dark theme emphasizing deep charcoal grays (`#121212`) and vibrant lavender accents (`#bb86fc`).

### One-Click Clipboard Exports
Copy perfectly styled Markdown prompts instantly with an interactive status-feedback system.

## 🛠️ Necessary Commands & Installation

Get the application up and running locally with these steps:

### 1. Installation

Install the necessary Node.js dependencies:

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the project's root directory and add your Gemini API key:

> **Important:** You must replace `your_actual_gemini_api_key_here` with your own valid Gemini API key. The application will not function correctly without a valid API key configured in the `.env.local` file.

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Run Development Server

Start the local Vite development server:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:3000
```

## 🚀 How to Use It

### 1. Upload
Drag and drop or browse to select your source style image (`JPG`, `PNG`, `WEBP`).

### 2. Generate
Click the **Generate Prompt** button. The app converts the file to Base64, sends it to the `gemini-2.5-flash` model, and processes it through a master prompt-engineering template.

### 3. Deploy
Copy the resulting custom structured prompt and paste it into your favorite image generator.
