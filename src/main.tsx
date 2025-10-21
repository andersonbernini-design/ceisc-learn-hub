import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  try {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  } catch (error) {
    console.error('MSW Error:', error);
  }
}

enableMocking().finally(() => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
});
