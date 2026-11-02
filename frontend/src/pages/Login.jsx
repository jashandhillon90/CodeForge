// Login.jsx — professional login page with demo auth
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Email is required.'); return; }
    if (!password) { setError('Password is required.'); return; }

    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));
    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back to CodeForge! (Demo Mode)');
      navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="auth-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '900px', width: '100%', background: '#151E29', border: '1px solid #263241', borderRadius: '8px', overflow: 'hidden' }}>

        {/* Brand panel */}
        <div className="auth-brand-panel" style={{ background: '#111820', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid #263241' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#38BDF8', borderRadius: '6px', padding: '5px 7px' }}><Code2 size={18} color="#0B0F14" strokeWidth={2.5} /></div>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#F1F5F9' }}>Code<span style={{ color: '#38BDF8' }}>Forge</span></span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Compete.<br />Code.<br />Improve.
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.8 }}>
              The campus competitive programming platform built to help you grow as a developer.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['Practice 20+ curated problems', 'Compete in live contests', 'Track your progress with analytics', 'Compare with campus peers'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38BDF8', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '0.75rem', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '8px', marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 500, marginBottom: '0.25rem' }}>Demo Mode</p>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Use any <strong style={{ color: '#F1F5F9' }}>@university.edu</strong> email to log in. No real authentication.</p>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>Admin: <strong style={{ color: '#F1F5F9' }}>admin@university.edu</strong></p>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-form-panel" style={{ padding: '3rem' }}>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '0.4rem' }}>Sign in</h1>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '2rem' }}>Access your CodeForge account.</p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', marginBottom: '1.25rem' }}>
              <AlertCircle size={15} color="#EF4444" />
              <span style={{ fontSize: '0.8125rem', color: '#EF4444' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#94A3B8', marginBottom: '0.4rem' }}>University Email</label>
              <input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="input-field" placeholder="you@university.edu" autoComplete="email" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#94A3B8' }}>Password</label>
                <button type="button" style={{ background: 'none', border: 'none', color: '#38BDF8', fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input id="login-password" type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="input-field" placeholder="Enter your password" autoComplete="current-password" style={{ paddingRight: '2.5rem' }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input id="remember-me" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="checkbox-custom" />
              <label htmlFor="remember-me" style={{ fontSize: '0.8125rem', color: '#94A3B8', cursor: 'pointer' }}>Remember me</label>
            </div>

            <button id="login-submit" type="submit" className="btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.6rem', fontSize: '0.9375rem' }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: 500 }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
