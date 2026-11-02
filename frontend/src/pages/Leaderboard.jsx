// Leaderboard.jsx — campus ranking with podium display
import { useState, useMemo } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Search, Trophy, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { STUDENTS } from '../data/students';
import { CONTESTS } from '../data/contests';

export default function Leaderboard() {
  const [search, setSearch] = useState('');
  const [contest, setContest] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [sortDir, setSortDir] = useState('desc');

  const pastContests = CONTESTS.filter(c => c.status === 'past');

  const sorted = useMemo(() => {
    let list = [...STUDENTS];
    if (search) list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.uid.toLowerCase().includes(search.toLowerCase()));
    list.sort((a, b) => {
      const av = a[sortBy], bv = b[sortBy];
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list.map((s, i) => ({ ...s, displayRank: i + 1 }));
  }, [search, sortBy, sortDir]);

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  };
  const SortIcon = ({ col }) => sortBy === col ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null;

  const getMedalColor = (rank) => ({ 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' }[rank] || '#94A3B8');
  const getRatingClass = (r) => r >= 2000 ? '#EF4444' : r >= 1800 ? '#F59E0B' : r >= 1600 ? '#38BDF8' : r >= 1400 ? '#22C55E' : '#94A3B8';

  return (
    <DashboardLayout title="Leaderboard">
      {/* Podium */}
      <div className="card" style={{ padding: '2rem 1.5rem', marginBottom: '1.25rem', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '1rem' }}>
          {/* 2nd */}
          {top3[1] && (
            <div style={{ textAlign: 'center', flex: 1, maxWidth: '180px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #C0C0C0, #d4d4d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', color: '#0B0F14', border: '2px solid #C0C0C0' }}>
                  {top3[1].avatar}
                </div>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9' }}>{top3[1].name}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{top3[1].uid}</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#C0C0C0', margin: '0.3rem 0' }}>{top3[1].rating}</div>
              <div style={{ background: '#1a2535', borderRadius: '4px 4px 0 0', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginTop: '0.5rem' }}>🥈</div>
            </div>
          )}
          {/* 1st */}
          {top3[0] && (
            <div style={{ textAlign: 'center', flex: 1, maxWidth: '200px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-16px', fontSize: '1.25rem' }}>👑</div>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFD700, #FFA500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', color: '#0B0F14', border: '2px solid #FFD700' }}>
                  {top3[0].avatar}
                </div>
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#F1F5F9', marginTop: '0.25rem' }}>{top3[0].name}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{top3[0].uid}</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#FFD700', margin: '0.3rem 0' }}>{top3[0].rating}</div>
              <div style={{ background: '#1a2535', borderRadius: '4px 4px 0 0', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginTop: '0.5rem' }}>🥇</div>
            </div>
          )}
          {/* 3rd */}
          {top3[2] && (
            <div style={{ textAlign: 'center', flex: 1, maxWidth: '180px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #CD7F32, #a0522d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', color: '#0B0F14', border: '2px solid #CD7F32' }}>
                  {top3[2].avatar}
                </div>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9' }}>{top3[2].name}</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{top3[2].uid}</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#CD7F32', margin: '0.3rem 0' }}>{top3[2].rating}</div>
              <div style={{ background: '#1a2535', borderRadius: '4px 4px 0 0', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginTop: '0.5rem' }}>🥉</div>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#4a5568' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field" placeholder="Search by name or UID…" style={{ paddingLeft: '2rem' }} />
        </div>
        <select value={contest} onChange={e => setContest(e.target.value)} className="select-field">
          <option value="all">All Time</option>
          {pastContests.map(c => <option key={c.id} value={c.id}>{c.shortName}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table-base">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>Student</th>
                <th>Section</th>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('rating')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Rating <SortIcon col="rating" /></span>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('solved')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Solved <SortIcon col="solved" /></span>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('contestPoints')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Points <SortIcon col="contestPoints" /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(s => (
                <tr key={s.id} style={{ background: s.isCurrentUser ? 'rgba(56,189,248,0.04)' : undefined }}>
                  <td>
                    <span style={{ fontWeight: 700, color: getMedalColor(s.displayRank), fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem' }}>
                      {s.displayRank <= 3 ? ['🥇', '🥈', '🥉'][s.displayRank - 1] : `#${s.displayRank}`}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}>{s.avatar}</div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {s.name}
                          {s.isCurrentUser && <span style={{ fontSize: '0.65rem', color: '#38BDF8', background: 'rgba(56,189,248,0.1)', padding: '1px 5px', borderRadius: '3px' }}>You</span>}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>{s.uid}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="tag-pill" style={{ fontSize: '0.75rem' }}>{s.section}</span></td>
                  <td>
                    <span style={{ fontWeight: 700, color: getRatingClass(s.rating), fontFamily: 'JetBrains Mono, monospace' }}>{s.rating}</span>
                  </td>
                  <td style={{ color: '#F1F5F9', fontFamily: 'JetBrains Mono, monospace' }}>{s.solved}</td>
                  <td style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>{s.contestPoints.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
