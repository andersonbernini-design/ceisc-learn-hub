import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  try {
    const { worker } = await import('./mocks/browser');
    
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  } catch (error) {
    console.error('Failed to start MSW:', error);
    return;
  }
}

enableMocking()
  .then(() => {
    const root = document.getElementById("root");
    if (root) {
      createRoot(root).render(<App />);
    }
  })
  .catch((error) => {
    console.error('Failed to initialize app:', error);
  });
