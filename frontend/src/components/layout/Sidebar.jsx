// Sidebar.jsx — dashboard sidebar navigation
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Trophy, Clock, BarChart2, User, Settings, ListOrdered, Code2, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/problems', label: 'Problems', icon: BookOpen },
  { path: '/contests', label: 'Contests', icon: Trophy },
  { path: '/submissions', label: 'Submissions', icon: Clock },
  { path: '/leaderboard', label: 'Leaderboard', icon: ListOrdered },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1.5rem', padding: '0 0.25rem' }}>
        <div style={{ background: '#38BDF8', borderRadius: '5px', padding: '3px 5px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Code2 size={14} color="#0B0F14" strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F1F5F9', letterSpacing: '-0.02em', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          Code<span style={{ color: '#38BDF8' }}>Forge</span>
        </span>
      </Link>

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const active = pathname === path || (path !== '/dashboard' && pathname.startsWith(`${path}/`));
          return (
            <Link key={path} to={path} title={label} aria-current={active ? 'page' : undefined} className={`sidebar-item ${active ? 'active' : ''}`}>
              <Icon size={16} strokeWidth={1.75} style={{ flexShrink: 0 }} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #263241' }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.25rem', marginBottom: '0.5rem' }}>
            <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '0.7rem', flexShrink: 0 }}>{user.avatar}</div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F1F5F9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{user.uid}</div>
            </div>
          </div>
        )}
        <button onClick={handleLogout} title="Logout" className="sidebar-item" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}>
          <LogOut size={16} strokeWidth={1.75} style={{ flexShrink: 0 }} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
