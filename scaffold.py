import os
import json

base_dir = "frontend"
os.makedirs(os.path.join(base_dir, "src"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "public"), exist_ok=True)

package_json = {
  "name": "frontend",
  "private": True,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.2.0"
  }
}

with open(os.path.join(base_dir, "package.json"), "w") as f:
    json.dump(package_json, f, indent=2)

with open(os.path.join(base_dir, "vite.config.js"), "w") as f:
    f.write('''import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
''')

with open(os.path.join(base_dir, "index.html"), "w") as f:
    f.write('''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Agent</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
''')

with open(os.path.join(base_dir, "src", "main.jsx"), "w") as f:
    f.write('''import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
''')

with open(os.path.join(base_dir, "src", "index.css"), "w") as f:
    f.write('''''')

with open(os.path.join(base_dir, "src", "App.css"), "w") as f:
    f.write('''''')

with open(os.path.join(base_dir, "src", "App.jsx"), "w") as f:
    f.write('''import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <div className="container">
        <h1>Autonomous Multi-Step AI Agent</h1>
      </div>
    </>
  )
}

export default App
''')

print("Scaffold complete.")
