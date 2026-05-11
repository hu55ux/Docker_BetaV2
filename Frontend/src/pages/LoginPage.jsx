import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/api';

const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Load draft on mount
    useEffect(() => {
        const draft = localStorage.getItem('login_draft');
        if (draft) setUsernameOrEmail(draft);
        
        const savedUser = localStorage.getItem('user');
        if (savedUser && savedUser !== "null") {
            navigate('/welcome');
        }
    }, [navigate]);

    // Save draft on change
    useEffect(() => {
        if (usernameOrEmail) {
            localStorage.setItem('login_draft', usernameOrEmail);
        }
    }, [usernameOrEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const result = await authService.login({ usernameOrEmail, password });
            if (result.success) {
                // Clear any old/corrupt session
                localStorage.removeItem('user');
                
                // Save user session
                const userData = {
                    username: usernameOrEmail.split('@')[0], 
                    email: usernameOrEmail.includes('@') ? usernameOrEmail : null,
                    token: result.data || 'success'
                };

                if (userData.username) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('lastUsername', usernameOrEmail);
                    localStorage.removeItem('login_draft'); // Clear draft on success
                }
                
                // Add a small delay for user experience
                setSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    navigate('/welcome');
                }, 1500);
            } else {
                setError(result.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection failed. Please check if the API is running on port 5267.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-(--bg-primary)">
            <div className="glass w-full max-w-xl space-y-12 fade-in shadow-2xl border-white/10">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight gradient-text">DockerBeta</h1>
                    <p className="text-gray-400 font-medium">Sign in to your development portal</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="form-group">
                            <label className="form-label font-semibold ml-1">Username or Email</label>
                            <input
                                type="text"
                                className="form-input bg-white/5 border-white/10 focus:border-blue-500/50"
                                placeholder="Enter your identity"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="flex justify-between items-center mb-1 ml-1">
                                <label className="form-label font-semibold mb-0">Password</label>
                                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot?</a>
                            </div>
                            <input
                                type="password"
                                className="form-input bg-white/5 border-white/10 focus:border-blue-500/50"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full py-4 text-lg shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating...
                            </span>
                        ) : 'Continue'}
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-(--bg-primary) px-2 text-gray-500">New here?</span>
                    </div>
                </div>

                <Link to="/signup" className="btn btn-outline w-full text-center block no-underline border-white/10 hover:bg-white/5">
                    Create a new account
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
