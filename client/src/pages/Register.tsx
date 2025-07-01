import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';
import { toast } from 'react-hot-toast';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authApi.register(formData);
            setUserId(response.data.userId);
            setIsOtpStep(true);
            setTimeLeft(600); // Start timer at 10 minutes
            toast.success('Please check your email for the OTP.', {
                duration: 5000,
            });
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || 'Registration failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await authApi.verifyOtp({ userId, otp });
            toast.success(res.data.message, {
                duration: 5000,
            });
            navigate('/signin', {
                state: {
                    email: formData.email,
                    message: 'Email verified successfully! Please sign in.',
                },
            });
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || 'OTP verification failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            await authApi.resendOtp(formData.email);
            setTimeLeft(600); // Reset timer to 10 minutes
            toast.success('A new OTP has been sent to your email.', {
                duration: 5000,
            });
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || 'Failed to resend OTP. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    useEffect(() => {
        if (isOtpStep && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isOtpStep, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        {isOtpStep ? 'Verify Your Email' : 'Create Your Account'}
                    </h2>
                </div>
                {!isOtpStep ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border 
                                             border-gray-300 dark:border-gray-600 placeholder-gray-500 
                                             text-gray-900 dark:text-white bg-white dark:bg-gray-700 
                                             focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                             focus:z-10 sm:text-sm"
                                    placeholder="Full name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border 
                                             border-gray-300 dark:border-gray-600 placeholder-gray-500 
                                             text-gray-900 dark:text-white bg-white dark:bg-gray-700 
                                             focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                             focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border 
                                             border-gray-300 dark:border-gray-600 placeholder-gray-500 
                                             text-gray-900 dark:text-white bg-white dark:bg-gray-700 
                                             focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                             focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                                         text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 
                                         to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none 
                                         focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 
                                         disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <span className="text-gray-500 dark:text-gray-400">
                                Already have an account?{' '}
                            </span>
                            <Link
                                to="/signin"
                                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 
                                         dark:hover:text-blue-300"
                            >
                                Sign in
                            </Link>
                        </div>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="otp" className="sr-only">
                                    OTP
                                </label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={handleOtpChange}
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border 
                                             border-gray-300 dark:border-gray-600 placeholder-gray-500 
                                             text-gray-900 dark:text-white bg-white dark:bg-gray-700 
                                             focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                             focus:z-10 sm:text-sm"
                                    placeholder="Enter 6-digit OTP"
                                />
                            </div>
                        </div>

                        {timeLeft > 0 ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Time remaining: {formatTime(timeLeft)}
                            </p>
                        ) : (
                            <p className="text-sm text-red-500 dark:text-red-400">
                                OTP has expired. Please request a new one.
                            </p>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading || timeLeft === 0}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                                         text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 
                                         to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none 
                                         focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 
                                         disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? 'Verifying OTP...' : 'Verify OTP'}
                            </button>
                        </div>

                        {timeLeft === 0 && (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={loading}
                                className="mt-4 w-full text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 
                                         dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Resend OTP'}
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};