// AdminLayout.jsx — sidebar layout for admin pages
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, LayoutDashboard, Trophy, BookOpen, Users, FileText, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV_ITEMS = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { path: '/admin/contests', label: 'Manage Contests', icon: Trophy },
  { path: '/admin/problems', label: 'Manage Problems', icon: BookOpen },
  { path: '/admin/students', label: 'Students', icon: Users },
  { path: '/admin/submissions', label: 'Submissions', icon: FileText },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children, title }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isActive = (item) => item.exact ? pathname === item.path : pathname.startsWith(item.path);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F14', display: 'flex' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{
        width: '220px', flexShrink: 0, background: '#101720',
        borderRight: '1px solid #263241', position: 'fixed',
        top: 0, left: 0, bottom: 0, display: 'flex', flexDirection: 'column',
        padding: '0', zIndex: 50, overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '1rem 0.75rem', borderBottom: '1px solid #263241' }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ background: '#EF4444', borderRadius: '5px', padding: '3px 5px', display: 'flex', alignItems: 'center' }}>
              <Code2 size={13} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="admin-brand-label" style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#F1F5F9', letterSpacing: '-0.02em' }}>
              Forge <span style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: 500 }}>Admin</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p className="admin-nav-label" style={{ fontSize: '0.7rem', color: '#4a5568', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.25rem 0.5rem', marginBottom: '0.25rem' }}>
            Navigation
          </p>
          {NAV_ITEMS.map(({ path, label, icon: Icon, exact }) => {
            const active = isActive({ path, exact });
            return (
              <Link key={path} to={path} title={label} aria-current={active ? 'page' : undefined} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.5rem 0.75rem', borderRadius: '6px', textDecoration: 'none',
                color: active ? '#EF4444' : '#94A3B8',
                background: active ? 'rgba(239,68,68,0.08)' : 'transparent',
                fontSize: '0.875rem', fontWeight: 500,
                transition: 'background 0.15s, color 0.15s',
              }}
                onMouseEnter={e => !active && (e.currentTarget.style.background = '#1a2535', e.currentTarget.style.color = '#F1F5F9')}
                onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = '#94A3B8')}
              >
                <Icon size={15} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                <span className="admin-nav-item-label" style={{ flex: 1 }}>{label}</span>
                {active && <ChevronRight size={13} />}
              </Link>
            );
          })}
        </nav>

        {/* Back to site + user */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid #263241' }}>
          <Link to="/dashboard" title="Student View" style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.5rem 0.75rem', borderRadius: '6px', textDecoration: 'none',
            color: '#94A3B8', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem',
          }}>
            <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
            <span className="admin-nav-item-label">Student View</span>
          </Link>
          {user && (
            <div style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{user.avatar}</div>
              <div className="admin-user-details" style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F1F5F9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Administrator</div>
              </div>
            </div>
          )}
          <button onClick={() => { logout(); navigate('/'); }} title="Logout" style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.5rem 0.75rem', borderRadius: '6px', width: '100%',
            background: 'none', border: 'none', color: '#94A3B8',
            cursor: 'pointer', fontSize: '0.875rem', textAlign: 'left',
          }}>
            <LogOut size={14} strokeWidth={1.75} />
            <span className="admin-logout-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main" style={{ marginLeft: '220px', flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{
          height: '52px', background: 'rgba(11,15,20,0.97)', borderBottom: '1px solid #263241',
          display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1rem',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>{title}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', fontWeight: 600 }}>
              Admin Mode
            </span>
            <span style={{ fontSize: '0.75rem', color: '#4a5568' }}>· Frontend Demo</span>
          </div>
        </header>
        <main style={{ padding: '1.5rem', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
