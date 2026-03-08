import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ username, email, password, role });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-decor"></div>
      <div className="auth-bg-decor-2"></div>

      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon pastel-gradient">
            <span className="material-symbols-outlined text-white text-2xl">blur_on</span>
          </div>
          <h1 className="text-2xl font-black text-white">Soft Vibez</h1>
        </div>

        <h2 className="text-xl font-bold text-white" style={{ marginBottom: '0.25rem' }}>Create an account</h2>
        <p className="text-sm text-slate-400" style={{ marginBottom: '1.5rem' }}>Start your musical journey</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <div className="auth-input-wrapper">
              <span className="material-symbols-outlined auth-input-icon">person</span>
              <input
                type="text"
                className="auth-input"
                placeholder="cooluser42"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <div className="auth-input-wrapper">
              <span className="material-symbols-outlined auth-input-icon">mail</span>
              <input
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <span className="material-symbols-outlined auth-input-icon">lock</span>
              <input
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">I am a...</label>
            <div className="auth-role-toggle">
              <button
                type="button"
                className={`auth-role-btn ${role === 'user' ? 'active' : ''}`}
                onClick={() => setRole('user')}
              >
                <span className="material-symbols-outlined text-sm">headphones</span>
                Listener
              </button>
              <button
                type="button"
                className={`auth-role-btn ${role === 'artist' ? 'active' : ''}`}
                onClick={() => setRole('artist')}
              >
                <span className="material-symbols-outlined text-sm">music_note</span>
                Artist
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>progress_activity</span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
