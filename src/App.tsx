import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import VerifyPage from './pages/VerifyPage';
import ConfirmPassword from './pages/ConformPassword';
import PasswordVerifyPage from './pages/PasswordVerifyPage';

function App() {
  // Enable dark mode globally
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/Verify-Otp" element={<VerifyPage />} />
            <Route path="/Password-Verify-Otp" element={<PasswordVerifyPage />} />
            <Route path="/Confirm-Password" element={<ConfirmPassword />} />
            <Route path="/*" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
