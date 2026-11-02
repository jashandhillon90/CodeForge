// Navbar.jsx — top navigation bar for landing/public pages
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar px-6">
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ background: '#38BDF8', borderRadius: '6px', padding: '4px 6px', display: 'flex', alignItems: 'center' }}>
            <Code2 size={16} color="#0B0F14" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#F1F5F9', letterSpacing: '-0.02em' }}>
            Code<span style={{ color: '#38BDF8' }}>Forge</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {['/', '/problems', '/contests', '/leaderboard'].map((path, i) => (
            <Link key={path} to={path}
              style={{ padding: '0.4rem 0.75rem', color: '#94A3B8', textDecoration: 'none', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = '#F1F5F9'}
              onMouseLeave={e => e.target.style.color = '#94A3B8'}
            >
              {['Home', 'Problems', 'Contests', 'Leaderboard'][i]}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {user ? (
            <>
              <Link to="/dashboard" className="btn-secondary btn-sm">Dashboard</Link>
              <button onClick={handleLogout} className="btn-secondary btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn-primary btn-sm">Get Started</Link>
            </>
          )}
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', padding: '0.35rem' }}
            className="mobile-menu-toggle"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, background: '#101720', borderBottom: '1px solid #263241', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[['/', 'Home'], ['/problems', 'Problems'], ['/contests', 'Contests'], ['/leaderboard', 'Leaderboard']].map(([path, label]) => (
            <Link key={path} to={path} onClick={() => setMenuOpen(false)}
              style={{ padding: '0.5rem 0.75rem', color: '#94A3B8', textDecoration: 'none', borderRadius: '6px', fontSize: '0.875rem' }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
