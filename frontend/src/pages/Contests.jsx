// Contests.jsx — contest listing with upcoming/ongoing/past tabs
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Search, Clock, Users, Calendar, ArrowRight } from 'lucide-react';
import { CONTESTS } from '../data/contests';

const STATUS_TABS = ['all', 'upcoming', 'ongoing', 'past'];

const statusBadge = (status) => {
  const map = { upcoming: 'badge-upcoming', ongoing: 'badge-ongoing', past: 'badge-past' };
  const label = { upcoming: 'Upcoming', ongoing: 'Live', past: 'Ended' };
  return <span className={`pill ${map[status]}`}>{label[status]}</span>;
};

export default function Contests() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = CONTESTS;
    if (tab !== 'all') list = list.filter(c => c.status === tab);
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.shortName.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [tab, search]);

  const counts = { all: CONTESTS.length, upcoming: CONTESTS.filter(c => c.status === 'upcoming').length, ongoing: CONTESTS.filter(c => c.status === 'ongoing').length, past: CONTESTS.filter(c => c.status === 'past').length };

  return (
    <DashboardLayout title="Contests">
      {/* Search + tabs */}
      <div className="card" style={{ marginBottom: '1.25rem', overflow: 'hidden' }}>
        <div style={{ padding: '0 1rem', borderBottom: '1px solid #263241', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex' }}>
            {STATUS_TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab === t ? 'active' : ''}`} style={{ textTransform: 'capitalize' }}>
                {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
                <span style={{ marginLeft: '5px', fontSize: '0.7rem', color: tab === t ? '#38BDF8' : '#4a5568', fontWeight: 600 }}>({counts[t]})</span>
              </button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#4a5568' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} className="input-field" placeholder="Search contests…" style={{ paddingLeft: '2rem', width: '220px' }} />
          </div>
        </div>
      </div>

      {/* Contest cards */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <Calendar size={32} color="#263241" />
          <p>No contests found.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(c => (
            <div key={c.id} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                    <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>{c.name}</h3>
                    {statusBadge(c.status)}
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                    {c.description.length > 120 ? c.description.slice(0, 120) + '…' : c.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8125rem', color: '#94A3B8', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} />{new Date(c.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} />{c.duration}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Users size={13} />{c.participants} registered
                    </span>
                    <span style={{ color: '#263241' }}>ID: <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#94A3B8' }}>{c.shortName}</span></span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end', flexShrink: 0 }}>
                  <Link to={`/contests/${c.id}`} className="btn-primary btn-sm">
                    View Details <ArrowRight size={13} />
                  </Link>
                  {c.status === 'upcoming' && !c.registered && (
                    <Link to={`/contests/${c.id}`} className="btn-secondary btn-sm">Register</Link>
                  )}
                  {c.registered && (
                    <span style={{ fontSize: '0.75rem', color: '#22C55E', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      ✓ Registered
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
