import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/api';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Load draft on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser && savedUser !== "null") {
            navigate('/welcome');
        }

        const draft = localStorage.getItem('signup_draft');
        if (draft) {
            try {
                setFormData(JSON.parse(draft));
            } catch (e) {
                console.error("Failed to parse signup draft", e);
            }
        }
    }, []);

    // Save draft on change
    useEffect(() => {
        localStorage.setItem('signup_draft', JSON.stringify(formData));
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const result = await authService.signUp(formData);
            if (result.success) {
                localStorage.removeItem('signup_draft'); // Clear draft on success
                alert('Registration Successful! Please log in.');
                navigate('/');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please check if the API is running on port 5267.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-(--bg-primary)">
            <div className="glass w-full max-w-xl space-y-12 fade-in shadow-2xl border-white/10">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight gradient-text">Create Account</h1>
                    <p className="text-gray-400 font-medium">Join the DockerBeta community</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="form-group">
                            <label className="form-label font-semibold ml-1">Username</label>
                            <input
                                type="text"
                                className="form-input bg-white/5 border-white/10 focus:border-blue-500/50"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label font-semibold ml-1">Email</label>
                            <input
                                type="email"
                                className="form-input bg-white/5 border-white/10 focus:border-blue-500/50"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label font-semibold ml-1">Password</label>
                            <input
                                type="password"
                                className="form-input bg-white/5 border-white/10 focus:border-blue-500/50"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label font-semibold ml-1">Confirm Password</label>
                            <input
                                type="password"
                                className="form-input bg-white/5 border-white/10 focus:border-blue-500/50"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full py-4 text-lg shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-400 hover:underline font-medium">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
