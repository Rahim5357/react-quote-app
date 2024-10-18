import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuoteListPage from './pages/QuoteListPage';
import QuoteCreationPage from './pages/QuoteCreationPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/quotes" element={<QuoteListPage />} />
          <Route path="/create-quote" element={<QuoteCreationPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

