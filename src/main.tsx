import { StrictMode, Component } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, color: "#ff7b72", fontFamily: "monospace", background: "#0d1117", minHeight: "100vh" }}>
          <h2 style={{ color: "#f0e68c" }}>Runtime Error (React)</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {(this.state.error as Error).message}
            {"\n\n"}
            {(this.state.error as Error).stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = createRoot(document.getElementById("root")!);

import("./App").then(({ default: App }) => {
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}).catch((err) => {
  root.render(
    <div style={{ padding: 32, color: "#ff7b72", fontFamily: "monospace", background: "#0d1117", minHeight: "100vh" }}>
      <h2 style={{ color: "#f0e68c" }}>Module Load Error</h2>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {String(err)}
        {"\n\n"}
        {(err as Error).stack ?? ""}
      </pre>
    </div>
  );
});
