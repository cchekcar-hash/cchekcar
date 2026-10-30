import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPixels } from './pixels'

initPixels();

const root = document.getElementById('root')!;
// Pages are prerendered at build time; hydrate them, or render from scratch for the SPA fallback
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
