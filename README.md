# 🚀 PWA Icons Generator

[繁體中文說明 (Traditional Chinese)](README.zh-TW.md)

A powerful, modern, and intuitive **Progressive Web App (PWA) Icon & Splash Generator**. Designed for developers, designers, and project creators to easily generate W3C-compliant, Android/iOS Maskable and standard PWA icons, dynamic Manifest configurations, with one-click bundling and live previews.

---

## ✨ Key Features

1. **Powerful Image Editing & Cropping**:
   - Upload custom images or choose from gorgeous preset vector icons.
   - Real-time zoom, pan, rotation, and background color adjustment.
   - Support for transparent backgrounds or custom solid/gradient fills.
2. **Safe Zone Preview**:
   - Instantly view the 80% circular safe zone (Maskable Icon standard) to ensure core icons are never clipped by Android or browser rounding masks.
3. **Multi-Device Realistic Preview**:
   - Real-time preview on mobile home screens (supports switching mask shapes like circle, rounded square, teardrop, etc.).
   - Simulate actual installed application icon presentation.
4. **Automatic Multi-Size Generation**:
   - Automatically generate all standard and maskable PWA sizes (e.g., 192x192, 512x512, etc.).
5. **One-Click ZIP Bundle & Manifest Generation**:
   - Bundle all icons and configuration files into a ZIP archive with a single click.
   - Automatically generate corresponding `manifest.json` snippets and HTML `<link>` declarations for easy project integration.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19, TypeScript
- **Build Tool**: Vite 6, Vite PWA Plugin
- **Styling**: Tailwind CSS v4
- **Animations & Interactions**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Archiving**: JSZip

---

## 📂 Project Structure

```text
pwa-icons-gen/
├── public/                 # Static assets & default PWA output icons
├── src/
│   ├── components/         # UI components (crop canvas, previewer, uploader, etc.)
│   ├── utils/              # Image processing & icon generation utilities
│   ├── App.tsx             # Main application logic
│   ├── main.tsx            # React entry point
│   └── index.css           # Global Tailwind CSS styles
├── index.html              # HTML entry point & PWA meta tags
├── vite.config.ts          # Vite & PWA plugin config
└── package.json            # Project dependencies & scripts
```

---

## 🚀 Getting Started & Installation

Make sure your environment has Node.js (v18+) installed.

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pwa-icons-gen.git
   cd pwa-icons-gen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will run at `http://localhost:3000`.

---

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```
The static files will be generated in the `dist/` directory.

### GitHub Pages Deployment
If deploying to GitHub Pages (e.g., repository name `pwa-icons-gen`), `vite.config.ts` is already configured with the appropriate `base` path and relative paths.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
