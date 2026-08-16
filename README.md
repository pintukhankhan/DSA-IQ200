# DSA IQ 200 — 10× Think

A professional, GitHub Pages-ready starter for an interactive DSA learning laboratory.

## Features

- 10 foundation subjects from the DSA roadmap
- 33-module Core → Expert → Research roadmap
- Interactive array visualizer
- Linear Search and Bubble Sort execution
- Step / Play / Reset controls
- AI-teacher style explanations
- Browser text-to-speech teacher
- Predict / Debug / Complexity / Optimization challenges
- XP, level and mastery tracking
- LocalStorage progress persistence
- Responsive dark interface
- No backend required for the starter
- Easy to deploy on GitHub Pages

## Folder structure

```text
DSA-IQ200/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── app.js
└── assets/
```

## Run locally

Open `index.html`, or:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Create a GitHub repository.
2. Upload these files.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Choose `main` and `/root`.
6. Save.

The site is static, so no server is required for the included features.

## Future architecture

The frontend is intentionally separated so future versions can add:

- Python/C++/Java/JavaScript sandbox execution
- Code → AST → execution trace
- Graph/tree editors
- Real AI teacher API
- Automatic test generation
- Adversarial inputs
- Formal invariant/correctness checking
- Advanced DP and graph visualizers
- User accounts and cloud progress
