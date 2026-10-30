import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPixels } from './pixels'

initPixels();

createRoot(document.getElementById("root")!).render(<App />);
