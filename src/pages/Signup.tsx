import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleUser, Mail, Lock, Loader2, Phone } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react'; 
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { baseURL } from '../config';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
   const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

    const handlePhoneChange = (value: string) => {
    setPhone(value);

    const phoneRegex = /^\d{10}$/; 

    if (!value) {
      setPhoneError('Phone number is required');
    } else if (!phoneRegex.test(value)) {
      setPhoneError('Enter a valid phone number');
    } else {
      setPhoneError('');
    }
  };

  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setNameError('');
  setEmailError('');
  setPasswordError('');
  setConfirmPasswordError('');

  let hasError = false;

  if (!name.trim()) {
    setNameError('Name is required');
    hasError = true;
  }

  if (!email.trim()) {
    setEmailError('Email is required');
    hasError = true;
  }

  if (!password) {
    setPasswordError('Password is required');
    hasError = true;
  }

  if (password !== confirmPassword) {
    setConfirmPasswordError('Passwords do not match');
    hasError = true;
  }

  if (hasError) return;

  try {
    const response = await fetch(`${baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phoneNumber: phone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
    const data = await response.json();
    localStorage.setItem('temporaryToken', data.token); 
    setSnackbarMessage('Signup successful! Redirecting...');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setLoading(true);
    navigate('/Verify-Otp');
  } catch (err: unknown) {
    let errorMsg = 'Signup failed';
    if (err && typeof err === 'object' && 'message' in err && typeof (err as { message?: string }).message === 'string') {
      errorMsg = (err as { message: string }).message;
    }
    setSnackbarMessage(errorMsg);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    setLoading(false);
  }
};

const isFormInvalid =
  !name.trim() ||
  !email.trim() ||
  !password ||
  !phone ||
  !confirmPassword ||
  !!nameError ||
  !!emailError ||
  !!passwordError ||
  !!phoneError ||
  !!confirmPasswordError;

const handleNameChange = (value: string) => {
  setName(value);

  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

  if (!value.trim()) {
    setNameError('Name is required');
  } else if (value.length < 3) {
    setNameError('Name must be at least 3 characters');
  } else if (value.length > 30) {
    setNameError('Name must be at most 30 characters');
  } else if (!nameRegex.test(value)) {
    setNameError('Only letters and a single space allowed between words');
  } else {
    setNameError('');
  }
};

const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.(com|in|co)$/;

const handleEmailChange = (value: string) => {
  setEmail(value);
  if (!value.trim()) {
    setEmailError('Email is required');
  } else if (!emailRegex.test(value.trim())) {
    setEmailError('Invalid email format');
  } else {
    setEmailError('');
  }
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const handlePasswordChange = (value: string) => {
  setPassword(value);

  if (!value.trim()) {
    setPasswordError('Password is required');
  } else if (!passwordRegex.test(value)) {
    setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character');
  } else {
    setPasswordError('');
  }
};


const handleConfirmPasswordChange = (value: string) => {
  setConfirmPassword(value);
  if (!value) {
    setConfirmPasswordError('Confirm your password');
  } else if (value !== password) {
    setConfirmPasswordError('Passwords do not match');
  } else {
    setConfirmPasswordError('');
  }
};

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[hsl(var(--primary))]">Create Account</h1>
            <p className="text-gray-600">Join MTMS to track your materials</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <CircleUser size={20} />
                </div>
                <input 
                  type="text" 
                  value={name}
                   onChange={(e) => handleNameChange(e.target.value)}
                  className="pl-10 w-full"
                  placeholder="John Doe"
                />
              </div>
                {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}

            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  value={email}
                   onChange={(e) => handleEmailChange(e.target.value)}
                  className="pl-10 w-full"
                  placeholder="your@email.com"
                />
              </div>
                {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}

            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="pl-10 w-full"
                  placeholder="+91 9876543210"
                  pattern="^\+?\d{10,15}$"
                  required
                />
              </div>
              {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
            </div>

            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={20} />
                </div>
                <input 
                 type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}

                  className="pl-10 w-full"
                  placeholder="••••••••"
                />
                <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              </div>
                {passwordError  && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}

            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={20} />
                </div>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}

                  className="pl-10 w-full"
                  placeholder="••••••••"
                />
                <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              </div>
                {confirmPasswordError  && <p className="text-sm text-red-500 mt-1">{confirmPasswordError}</p>}

            </div>
          
            
          
            
          <button 
            type="submit" 
            className={`w-full flex justify-center items-center 
              ${isFormInvalid || loading ? 'bg-gray-400 text-gray-100' : 'primary text-white hover:bg-primary-dark'} 
              py-2 rounded`}
            disabled={isFormInvalid || loading}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Creating account...
              </>
            ) : 'Sign up'}
          </button>

            
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

            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[hsl(var(--primary))] hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;