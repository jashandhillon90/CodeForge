// Pagination.jsx — reusable pagination component
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      <button onClick={() => onChange(current - 1)} disabled={current === 1}
        style={{ padding: '0.3rem 0.5rem', background: 'none', border: '1px solid #263241', borderRadius: '5px', color: current === 1 ? '#4a5568' : '#94A3B8', cursor: current === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}>
        <ChevronLeft size={14} />
      </button>
      {pages.map((p, i) => (
        p === '...' ? (
          <span key={i} style={{ color: '#94A3B8', padding: '0.3rem 0.4rem', fontSize: '0.875rem' }}>…</span>
        ) : (
          <button key={p} onClick={() => onChange(p)}
            style={{ padding: '0.3rem 0.6rem', background: p === current ? '#38BDF8' : 'none', border: `1px solid ${p === current ? '#38BDF8' : '#263241'}`, borderRadius: '5px', color: p === current ? '#0B0F14' : '#94A3B8', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: p === current ? 600 : 400, minWidth: '32px' }}>
            {p}
          </button>
        )
      ))}
      <button onClick={() => onChange(current + 1)} disabled={current === total}
        style={{ padding: '0.3rem 0.5rem', background: 'none', border: '1px solid #263241', borderRadius: '5px', color: current === total ? '#4a5568' : '#94A3B8', cursor: current === total ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
