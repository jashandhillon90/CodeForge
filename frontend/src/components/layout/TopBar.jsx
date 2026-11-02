// TopBar.jsx — top bar for authenticated dashboard pages
import { useState } from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const NOTIFICATIONS = [
  { id: 1, text: "CWC-12 contest is live now!", time: "2 min ago", unread: true },
  { id: 2, text: "Your submission for Two Sum was Accepted", time: "2 hours ago", unread: true },
  { id: 3, text: "Campus Championship registration is open", time: "1 day ago", unread: false },
];

export default function TopBar({ title }) {
  const { user } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '56px',
      background: 'rgba(11,15,20,0.95)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #263241', zIndex: 100,
      display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1rem',
    }}>
      {/* Spacer for sidebar */}
      <div className="topbar-sidebar-spacer" />

      {/* Page title */}
      <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', flex: 1 }}>{title}</span>

      {/* Search */}
      <div className="topbar-search">
        <Search size={14} style={{ position: 'absolute', left: '0.6rem', color: '#4a5568' }} />
        <input placeholder="Search problems…" className="input-field" style={{ paddingLeft: '2rem', width: '200px' }} />
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
          style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', padding: '0.35rem' }}>
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="notif-badge">{unreadCount}</span>
          )}
        </button>
        {showNotif && (
          <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '0.5rem', width: '280px', background: '#151E29', border: '1px solid #263241', borderRadius: '8px', zIndex: 200, overflow: 'hidden' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #263241', fontWeight: 600, fontSize: '0.875rem', color: '#F1F5F9' }}>Notifications</div>
            {NOTIFICATIONS.map(n => (
              <div key={n.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #1a2535', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: n.unread ? 'rgba(56,189,248,0.04)' : 'transparent' }}>
                {n.unread && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38BDF8', marginTop: '5px', flexShrink: 0 }} />}
                {!n.unread && <div style={{ width: '6px', flexShrink: 0 }} />}
                <div>
                  <div style={{ fontSize: '0.8125rem', color: '#F1F5F9' }}>{n.text}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          <div className="avatar">{user?.avatar || 'DS'}</div>
          <div style={{ textAlign: 'left', display: 'none' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F1F5F9' }}>{user?.name}</div>
          </div>
          <ChevronDown size={14} color="#94A3B8" />
        </button>
        {showProfile && (
          <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '0.5rem', width: '200px', background: '#151E29', border: '1px solid #263241', borderRadius: '8px', zIndex: 200, overflow: 'hidden' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #263241' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#F1F5F9' }}>{user?.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{user?.email}</div>
            </div>
            <Link to="/profile" onClick={() => setShowProfile(false)} style={{ display: 'block', padding: '0.6rem 1rem', color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}
              onMouseEnter={e => e.target.style.color = '#F1F5F9'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>
              View Profile
            </Link>
            <Link to="/settings" onClick={() => setShowProfile(false)} style={{ display: 'block', padding: '0.6rem 1rem', color: '#94A3B8', textDecoration: 'none', fontSize: '0.875rem' }}
              onMouseEnter={e => e.target.style.color = '#F1F5F9'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>
              Settings
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
