import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import "./index.css";
import App from "./App.jsx";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>
);
