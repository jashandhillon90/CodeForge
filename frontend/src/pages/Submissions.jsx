// Submissions.jsx — full submission history with filters and detail modal
import { useState, useMemo } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Modal from '../components/common/Modal';
import Pagination from '../components/common/Pagination';
import { Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SUBMISSIONS, VERDICTS, LANGUAGES, getVerdictClass, getVerdictShort } from '../data/submissions';

const PAGE_SIZE = 10;

export default function Submissions() {
  const [search, setSearch] = useState('');
  const [verdict, setVerdict] = useState('All');
  const [language, setLanguage] = useState('All');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let list = [...SUBMISSIONS];
    if (search) list = list.filter(s => s.problem.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));
    if (verdict !== 'All') list = list.filter(s => s.verdict === verdict);
    if (language !== 'All') list = list.filter(s => s.language === language);
    return list;
  }, [search, verdict, language]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (fn) => { fn(); setPage(1); };

  return (
    <DashboardLayout title="Submissions">
      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #263241', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#4a5568' }} />
            <input value={search} onChange={e => handleFilter(() => setSearch(e.target.value))} className="input-field" placeholder="Search by problem or ID…" style={{ paddingLeft: '2rem' }} />
          </div>
          <select value={verdict} onChange={e => handleFilter(() => setVerdict(e.target.value))} className="select-field">
            {VERDICTS.map(v => <option key={v}>{v}</option>)}
          </select>
          <select value={language} onChange={e => handleFilter(() => setLanguage(e.target.value))} className="select-field">
            {LANGUAGES.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table-base">
            <thead>
              <tr>
                <th>ID</th>
                <th>Problem</th>
                <th>Language</th>
                <th>Verdict</th>
                <th>Runtime</th>
                <th>Memory</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>No submissions match your filters.</td></tr>
              ) : paginated.map(s => (
                <tr key={s.id}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#94A3B8' }}>{s.id}</td>
                  <td>
                    <Link to={`/problems/${s.problemId}`} style={{ color: '#F1F5F9', textDecoration: 'none', fontWeight: 500 }}
                      onMouseEnter={e => e.target.style.color = '#38BDF8'} onMouseLeave={e => e.target.style.color = '#F1F5F9'}>
                      {s.problem}
                    </Link>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#94A3B8' }}>{s.language}</td>
                  <td><span className={`pill ${getVerdictClass(s.verdict)}`} style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{getVerdictShort(s.verdict)}</span></td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: s.runtime === '—' ? '#4a5568' : '#94A3B8' }}>{s.runtime}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: s.memory === '—' ? '#4a5568' : '#94A3B8' }}>{s.memory}</td>
                  <td style={{ fontSize: '0.8rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>{s.date.split(' ')[0]}</td>
                  <td>
                    <button onClick={() => setSelected(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center' }}>
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #263241', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
            {filtered.length} submission{filtered.length !== 1 ? 's' : ''}
          </span>
          <Pagination current={page} total={totalPages} onChange={setPage} />
        </div>
      </div>

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Submission ${selected?.id}`}>
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                ['Problem', selected.problem],
                ['Language', selected.language],
                ['Verdict', null],
                ['Runtime', selected.runtime],
                ['Memory', selected.memory],
                ['Submitted', selected.date],
              ].map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.2rem' }}>{k}</p>
                  {k === 'Verdict' ? (
                    <span className={`pill ${getVerdictClass(selected.verdict)}`}>{selected.verdict}</span>
                  ) : (
                    <p style={{ fontSize: '0.875rem', color: '#F1F5F9', fontWeight: 500 }}>{v}</p>
                  )}
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.5rem' }}>Code Preview (Demo)</p>
              <div className="code-block" style={{ fontSize: '0.8125rem', minHeight: '80px', color: '#94A3B8', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Code display requires backend integration.{'\n'}(Frontend demo only)
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Link to={`/problems/${selected.problemId}`} className="btn-primary btn-sm">Open Problem</Link>
              <button onClick={() => setSelected(null)} className="btn-secondary btn-sm">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
