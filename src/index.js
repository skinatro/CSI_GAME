import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import LoginPage from "./LoginPage";
import ErrorPage from "./ErrorPage"; 
import Win95Terminal from "./Win95Terminal";
import Windows95Matrix from "./Windows95Matrix";
import LogoutPage from "./LogoutPage";
import GraphComparisonApp from "./GraphComparisonApp"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/error" element={<ErrorPage />} /> 
        <Route path="/Win" element={<Win95Terminal />} />
        <Route path="/matrix" element={<Windows95Matrix />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/compare" element={<GraphComparisonApp />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
