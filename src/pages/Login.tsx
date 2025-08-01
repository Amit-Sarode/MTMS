import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircleUser, Lock, Loader2 } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react'; 
import { Snackbar, Alert } from '@mui/material';
import { baseURL } from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  const rememberedPassword = localStorage.getItem('rememberedPassword');

  if (rememberedEmail && rememberedPassword) {
    setEmail(rememberedEmail);
    setPassword(rememberedPassword);
    setRememberMe(true);
  }
  }, []);

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  useEffect(() => {
    const isValid = email && validateEmail(email) && password;
    setIsFormValid(Boolean(isValid));
  }, [email, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError('Email is required');
    } else if (!validateEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!isFormValid) return;

  try {
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(result.data));
    localStorage.removeItem('temporaryToken');
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }

    setLoading(true)
    setSnackbarMessage('Login successful');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    login(result.token, result.user);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  } catch (error: any) {
    setLoading(false)
    setSnackbarMessage(error.message || 'Login failed');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  }
};

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[hsl(var(--primary))]">MTMS</h1>
            <p className="text-gray-600">Materials Tracking Management System</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <CircleUser size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-10 w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="your@email.com"
                />
              </div>
              {emailError && <div className="text-sm text-red-600"  style={{marginTop:"5px"}}>{emailError}</div>}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Password</label>
              </div>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className="pl-10 pr-10 w-full border border-gray-300 rounded px-3 py-2"
                placeholder="••••••••"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            <div className='flex justify-between items-center mt-2'>
              <label className='cursor-pointer'>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className='focus:outline-none focus:ring-0'
                  />
                  <span className='ml-1'>Remember me</span>
                </label>
              <Link to="/forgot-password" className="text-sm text-[hsl(var(--primary))] hover:underline">
                Forgot password?
              </Link>
            </div>

            </div>

              {passwordError && <div className="text-sm text-red-600" style={{marginTop:"5px"}}>{passwordError}</div>}

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full flex justify-center items-center text-white py-2 rounded 
                ${(!isFormValid || loading) 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Logging in...
                </>
              ) : 'Log in'}
            </button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-[hsl(var(--primary))] hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

      </div>
    </div>
  );
};

export default Login;