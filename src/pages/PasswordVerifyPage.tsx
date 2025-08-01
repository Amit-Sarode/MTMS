import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../config';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const PasswordVerifyPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setShowResend(true);
    }
  }, [timer]);

  const handleOtpChange = (value: string) => {
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setOtpError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const token = localStorage.getItem('forgotPasswordToken');
    e.preventDefault();

    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'OTP verification failed');
      }

      setSnackbarMessage('OTP verified! Logging in...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
        navigate('/Confirm-Password');

    } catch (err: any) {
      const errorMsg = err.message || 'OTP verification failed';
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleResend = async () => {
    const token = localStorage.getItem('forgotPasswordToken');
    try {
      const response = await fetch(`${baseURL}/resentOtp`, {
        method: 'POST',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend OTP');
      }

      setSnackbarMessage('OTP resent successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimer(30);
      setShowResend(false);
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to resend OTP';
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Enter 6-digit OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => handleOtpChange(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="123456"
            maxLength={6}
          />
          {otpError && <p className="text-sm text-red-500 mt-1">{otpError}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
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

        {showResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-600 hover:underline mt-2"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-sm text-gray-500 mt-2">Resend OTP in {timer}s</p>
        )}
      </form>
    </div>
  );
};

export default PasswordVerifyPage;
