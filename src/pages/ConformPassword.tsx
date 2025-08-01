import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { baseURL } from '../config';

const ConfirmPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); ('');
    const navigate = useNavigate();

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        if (!newPassword || !confirmPassword) {
            setSnackbarMessage('Both password fields are required');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (newPassword !== confirmPassword) {
            setSnackbarMessage('Passwords do not match');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            setSnackbarMessage(
                'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character'
            );
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('forgotPasswordToken');
            const response = await fetch(`${baseURL}/resetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify({
                    newPassword,
                    confirmPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to reset password');
            }
            setSnackbarMessage('Password reset successful!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setSnackbarMessage('Failed to reset password. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[hsl(var(--background))]">
            <div className="w-full max-w-md card animate-fadeIn">
                <h1 className="text-3xl font-bold text-center text-[hsl(var(--primary))] mb-4">
                    Set New Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                <Lock size={20} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="pl-10 pr-10 w-full"
                                placeholder="Enter new password"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                <Lock size={20} />
                            </div>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10 pr-10 w-full"
                                placeholder="Confirm new password"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                        </div>
                    </div>

                    {formError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
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
                                Submitting...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
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
    );
};

export default ConfirmPassword;
