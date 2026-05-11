import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import NotFoundPage from './pages/NotFoundPage';

const LandingPage = () => (
  <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
    <div className="fade-in">
      <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>
        Build <span className="gradient-text">Beautiful</span> <br />
        Containerized Apps
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '40px' }}>
        A premium full-stack starter kit with ASP.NET Core Identity, SQLite, and React. 
        Deployable anywhere with Docker.
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/signup" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
          Get Started
        </Link>
        <button className="btn btn-outline" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
          Documentation
        </button>
      </div>
    </div>

    <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', width: '100%', maxWidth: '1000px' }}>
      <div className="glass fade-in" style={{ padding: '30px', animationDelay: '0.2s' }}>
        <h3 style={{ marginBottom: '15px' }}>🚀 Fast Setup</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Vite + ASP.NET Core for lightning fast development.</p>
      </div>
      <div className="glass fade-in" style={{ padding: '30px', animationDelay: '0.4s' }}>
        <h3 style={{ marginBottom: '15px' }}>🔒 Secure Identity</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Robust authentication with Microsoft Identity.</p>
      </div>
      <div className="glass fade-in" style={{ padding: '30px', animationDelay: '0.6s' }}>
        <h3 style={{ marginBottom: '15px' }}>🐳 Docker Ready</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Pre-configured Dockerfile for seamless deployment.</p>
      </div>
    </div>
  </main>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="glass" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 className="gradient-text">DockerBeta</h2>
          </Link>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" className="btn btn-outline" style={{ textDecoration: 'none' }}>Log In</Link>
            <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sign Up</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <footer style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }}>
          <p>© 2026 DockerBeta. Built with Passion.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
