// Problems.jsx — problem catalogue with full filtering/search/pagination
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import DifficultyBadge from '../components/common/DifficultyBadge';
import Pagination from '../components/common/Pagination';
import { Search, CheckCircle2, Circle, ChevronUp, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { PROBLEMS, TOPICS, DIFFICULTIES } from '../data/problems';

const PAGE_SIZE = 10;

export default function Problems() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [topic, setTopic] = useState('All');
  const [status, setStatus] = useState('All'); // All | Solved | Unsolved
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...PROBLEMS];
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.topic.toLowerCase().includes(search.toLowerCase()));
    if (difficulty !== 'All') list = list.filter(p => p.difficulty === difficulty);
    if (topic !== 'All') list = list.filter(p => p.topic === topic);
    if (status === 'Solved') list = list.filter(p => p.solved);
    if (status === 'Unsolved') list = list.filter(p => !p.solved);
    list.sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (typeof av === 'string') av = av.toLowerCase(), bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [search, difficulty, topic, status, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortIcon = ({ col }) => sortBy === col ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null;

  const handleFilter = (fn) => { fn(); setPage(1); };

  const diffCounts = { Easy: PROBLEMS.filter(p => p.difficulty === 'Easy').length, Medium: PROBLEMS.filter(p => p.difficulty === 'Medium').length, Hard: PROBLEMS.filter(p => p.difficulty === 'Hard').length };
  const solvedCount = PROBLEMS.filter(p => p.solved).length;

  return (
    <DashboardLayout title="Problems">
      {/* Summary */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: PROBLEMS.length, color: '#94A3B8' },
          { label: 'Easy', value: diffCounts.Easy, color: '#22C55E' },
          { label: 'Medium', value: diffCounts.Medium, color: '#F59E0B' },
          { label: 'Hard', value: diffCounts.Hard, color: '#EF4444' },
          { label: 'Solved', value: solvedCount, color: '#38BDF8' },
        ].map(({ label, value, color }) => (
          <div key={label} className="stat-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color }}>{value}</span>
            <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{label}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Filters toolbar */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #263241', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#4a5568' }} />
            <input value={search} onChange={e => handleFilter(() => setSearch(e.target.value))}
              className="input-field" placeholder="Search problems…" style={{ paddingLeft: '2rem' }} />
          </div>

          <select value={difficulty} onChange={e => handleFilter(() => setDifficulty(e.target.value))} className="select-field">
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>

          <select value={topic} onChange={e => handleFilter(() => setTopic(e.target.value))} className="select-field">
            {TOPICS.map(t => <option key={t}>{t}</option>)}
          </select>

          <select value={status} onChange={e => handleFilter(() => setStatus(e.target.value))} className="select-field">
            {['All', 'Solved', 'Unsolved'].map(s => <option key={s}>{s}</option>)}
          </select>

          <button onClick={() => { handleFilter(() => { setSearch(''); setDifficulty('All'); setTopic('All'); setStatus('All'); setSortBy('id'); setSortDir('asc'); }); }}
            className="btn-secondary btn-sm" style={{ whiteSpace: 'nowrap' }}>
            <SlidersHorizontal size={13} /> Reset
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table-base">
            <thead>
              <tr>
                <th style={{ width: '48px' }}>Status</th>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('title')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Title <SortIcon col="title" /></span>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('difficulty')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Difficulty <SortIcon col="difficulty" /></span>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('topic')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Topic <SortIcon col="topic" /></span>
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('acceptance')}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Acceptance <SortIcon col="acceptance" /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>No problems match your filters.</td></tr>
              ) : paginated.map(p => (
                <tr key={p.id}>
                  <td>
                    {p.solved
                      ? <CheckCircle2 size={16} color="#22C55E" />
                      : <Circle size={16} color="#263241" />}
                  </td>
                  <td>
                    <Link to={`/problems/${p.id}`} style={{ color: '#F1F5F9', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem' }}
                      onMouseEnter={e => e.target.style.color = '#38BDF8'}
                      onMouseLeave={e => e.target.style.color = '#F1F5F9'}>
                      {p.id}. {p.title}
                    </Link>
                  </td>
                  <td><DifficultyBadge difficulty={p.difficulty} /></td>
                  <td><span className="tag-pill" style={{ fontSize: '0.75rem' }}>{p.topic}</span></td>
                  <td style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.825rem' }}>{p.acceptance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #263241', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} problems
          </span>
          <Pagination current={page} total={totalPages} onChange={setPage} />
        </div>
      </div>
    </DashboardLayout>
  );
}
