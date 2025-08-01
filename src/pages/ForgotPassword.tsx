import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Snackbar from '@mui/material/Snackbar';
import { baseURL } from '../config';
import Alert from '@mui/material/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email) {
      setFormError('Email is required');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/forgotPassword`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      localStorage.setItem('forgotPasswordToken', data.token); 
      if (res.ok) {
        setSnackbarMessage('Reset link sent successfully!');
        setSnackbarOpen(true);
        setSnackbarSeverity('success');
        navigate('/Password-Verify-Otp');
      } else {
        setSnackbarMessage(data.message || 'Failed to send reset link');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage('Something went wrong');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[hsl(var(--primary))]">Reset Password</h1>
            <p className="text-gray-600">We'll send you a link to reset your password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
                {formError}
              </div>
            )}

            <button
              type="submit"
              className="primary w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                'Send reset link'
              )}
            </button>

            <div className="text-center">
              <Link to="/login" className="inline-flex items-center text-[hsl(var(--primary))] hover:underline">
                <ArrowLeft size={16} className="mr-1" />
                Back to login
              </Link>
            </div>
          </form>
        </div>
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
  );
};

export default ForgotPassword;
