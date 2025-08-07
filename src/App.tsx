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
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Verify-Otp" element={<VerifyPage />} />
          <Route path="/Password-Verify-Otp" element={<PasswordVerifyPage />} />


          
          <Route path="/Confirm-Password" element={<ConfirmPassword />} />
          <Route 
            path="/*" 
            element={
                <Dashboard />
            } 
          />
          <Route 
            path="/profile" 
            element={
                <ProfilePage />
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
  <div className="bg-white text-black dark:bg-black dark:text-white p-4">
  <h1 className="text-xl font-bold">Bill of Materials (BOM)</h1>
</div>

}

export default App;