import React from 'react';
import ReactDOM from "react-dom/client"
import App from './App';
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ResetStyle from "./style/ResetStyle"
import GlobalStyle from "./style/GlobalStyle"


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ResetStyle />
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

