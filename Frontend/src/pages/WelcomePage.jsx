import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser || savedUser === "null") {
            console.warn("WelcomePage: No saved user found, redirecting to login");
            navigate('/');
        } else {
            try {
                const parsed = JSON.parse(savedUser);
                if (parsed && typeof parsed === 'object') {
                    console.log("WelcomePage: Valid user object found:", parsed);
                    setUser(parsed);
                } else if (parsed) {
                    console.log("WelcomePage: User is a string, wrapping in object:", parsed);
                    setUser({ username: parsed });
                } else {
                    console.warn("WelcomePage: Parsed user is null/empty, redirecting");
                    navigate('/');
                }
            } catch (e) {
                console.error("WelcomePage: Failed to parse user data", e);
                navigate('/');
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-(--bg-primary) text-white font-mono">
                Loading session...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-(--bg-primary) p-4 md:p-8 animate-in fade-in duration-500">
            {/* Header / Top Bar */}
            <header className="max-w-7xl mx-auto flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">DockerBeta <span className="text-blue-500 font-medium text-sm ml-2">Console</span></h2>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-medium text-green-400">All Systems Operational</span>
                    </div>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto space-y-8">
                {/* Hero Section */}
                <section className="glass p-8 md:p-12 relative overflow-hidden group border-white/10 shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div className="relative z-10 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Welcome back, <br />
                            <span className="gradient-text">{user.username || 'Developer'}</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                            Your development environment is ready. You currently have <span className="text-blue-400 font-bold">4 active containers</span> and <span className="text-purple-400 font-bold">12 pending tasks</span> assigned to your account.
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4">
                            <button onClick={() => navigate('/home')} className="btn btn-primary px-8 py-3 rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Launch Dashboard
                            </button>
                            <button className="btn btn-outline px-8 py-3 rounded-xl font-bold border-white/10 hover:bg-white/5 transition-all">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </section>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* System Status */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass p-6 border-white/10 space-y-6">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                System Resources
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-gray-400">CPU Usage</span>
                                        <span className="text-blue-400">24%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '24%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-gray-400">Memory Allocation</span>
                                        <span className="text-purple-400">1.2GB / 4GB</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '30%' }}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-gray-400">Disk I/O</span>
                                        <span className="text-green-400">Standard</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Connection Details */}
                        <div className="glass p-6 border-white/10 space-y-4">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Instance Details
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500">API Endpoint</label>
                                    <p className="text-sm font-mono text-gray-300 truncate">http://localhost:5267/api</p>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Environment</label>
                                    <p className="text-sm text-gray-300">Development Mode</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass p-6 border-white/10 h-full">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold">Recent Server Events</h3>
                                <button className="text-xs text-blue-400 hover:underline">View All Logs</button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { time: '2 mins ago', event: 'Web API restarted following config update', status: 'info' },
                                    { time: '15 mins ago', event: 'New migration applied to SQL Server', status: 'success' },
                                    { time: '1 hour ago', event: 'Frontend build optimized (Vite)', status: 'info' },
                                    { time: '3 hours ago', event: 'User session persistent storage initialized', status: 'info' },
                                    { time: 'Yesterday', event: 'CORS policy updated to AllowAll', status: 'warning' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/8 transition-colors group">
                                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                            item.status === 'success' ? 'bg-green-500' : 
                                            item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                        }`}></div>
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors">{item.event}</p>
                                            <p className="text-xs text-gray-500">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: 'User Profile', desc: 'Manage your credentials', icon: '👤' },
                        { title: 'System Logs', desc: 'Review runtime events', icon: '📋' },
                        { title: 'Database', desc: 'Inspect LocalDB tables', icon: '🗄️' },
                        { title: 'Settings', desc: 'Configure portal layout', icon: '⚙️' }
                    ].map((item, i) => (
                        <div key={i} className="glass p-5 border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group text-center sm:text-left">
                            <span className="text-2xl block mb-3 grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                            <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-gray-500 leading-tight">{item.desc}</p>
                        </div>
                    ))}
                </section>
            </main>

            <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm italic">
                <p>DockerBeta Management System v1.0.4-stable</p>
                <div className="flex gap-6 not-italic">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;
