// AdminContests.jsx — full CRUD for contests using local state
import { useState, useMemo } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import Modal from '../../components/common/Modal.jsx';
import { Plus, Search, Edit2, Trash2, Users, Calendar, Clock, Trophy } from 'lucide-react';
import { CONTESTS as INITIAL_CONTESTS } from '../../data/contests.js';
import { STUDENTS } from '../../data/students.js';
import toast from 'react-hot-toast';

const STATUS_OPTS = ['upcoming', 'ongoing', 'past'];

const BLANK_FORM = {
  name: '', description: '', startDate: '', duration: '2 hours',
  status: 'upcoming', prizes: '', maxParticipants: 100,
};

const statusBadge = (status) => {
  const styles = {
    upcoming: { bg: 'rgba(56,189,248,0.1)', color: '#38BDF8', border: 'rgba(56,189,248,0.25)' },
    ongoing: { bg: 'rgba(34,197,94,0.1)', color: '#22C55E', border: 'rgba(34,197,94,0.25)' },
    past: { bg: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: 'rgba(148,163,184,0.25)' },
  }[status];
  const labels = { upcoming: 'Upcoming', ongoing: 'Live', past: 'Ended' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: styles.bg, color: styles.color, border: `1px solid ${styles.border}` }}>
      {labels[status]}
    </span>
  );
};

export default function AdminContests() {
  const [contests, setContests] = useState(INITIAL_CONTESTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [participantsTarget, setParticipantsTarget] = useState(null);
  const [form, setForm] = useState({ ...BLANK_FORM });

  const filtered = useMemo(() => {
    let list = contests;
    if (statusFilter !== 'all') list = list.filter(c => c.status === statusFilter);
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [contests, search, statusFilter]);

  const set = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const openCreate = () => { setForm({ ...BLANK_FORM }); setCreateOpen(true); };

  const openEdit = (c) => {
    setEditTarget(c);
    setForm({
      name: c.name, description: c.description,
      startDate: c.startDate?.slice(0, 16) || '',
      duration: c.duration, status: c.status, prizes: c.prizes || '', maxParticipants: c.maxParticipants || 100,
    });
  };

  const handleCreate = () => {
    if (!form.name.trim()) { toast.error('Contest name is required.'); return; }
    if (!form.startDate) { toast.error('Start date is required.'); return; }
    const newContest = {
      id: Math.max(...contests.map(c => c.id)) + 1,
      name: form.name.trim(),
      shortName: form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 5),
      description: form.description,
      startDate: new Date(form.startDate).toISOString(),
      duration: form.duration,
      status: form.status,
      participants: 0,
      maxParticipants: Number(form.maxParticipants),
      prizes: form.prizes,
      registered: false,
      problems: [],
      rules: ['No plagiarism.', 'Use your own code.', 'Results are final.'],
    };
    setContests(prev => [...prev, newContest]);
    setCreateOpen(false);
    toast.success(`Contest "${form.name}" created! (Demo)`);
  };

  const handleEdit = () => {
    if (!form.name.trim()) { toast.error('Contest name is required.'); return; }
    setContests(prev => prev.map(c =>
      c.id === editTarget.id ? {
        ...c, name: form.name, description: form.description,
        startDate: new Date(form.startDate).toISOString(),
        duration: form.duration, status: form.status, prizes: form.prizes,
      } : c
    ));
    setEditTarget(null);
    toast.success('Contest updated! (Demo)');
  };

  const handleDelete = () => {
    setContests(prev => prev.filter(c => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast.success('Contest deleted. (Demo)');
  };

  const FormField = ({ label, children }) => (
    <div>
      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#94A3B8', marginBottom: '0.35rem' }}>{label}</label>
      {children}
    </div>
  );

  const ContestForm = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <FormField label="Contest Name">
        <input value={form.name} onChange={set('name')} className="input-field" placeholder="e.g. Campus Coding Championship" />
      </FormField>
      <FormField label="Description">
        <textarea value={form.description} onChange={set('description')} className="input-field" style={{ height: '80px', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Brief contest description…" />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <FormField label="Start Date & Time">
          <input type="datetime-local" value={form.startDate} onChange={set('startDate')} className="input-field" />
        </FormField>
        <FormField label="Duration">
          <input value={form.duration} onChange={set('duration')} className="input-field" placeholder="e.g. 2 hours" />
        </FormField>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <FormField label="Status">
          <select value={form.status} onChange={set('status')} className="select-field" style={{ width: '100%' }}>
            {STATUS_OPTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </FormField>
        <FormField label="Max Participants">
          <input type="number" value={form.maxParticipants} onChange={set('maxParticipants')} className="input-field" min="1" />
        </FormField>
      </div>
      <FormField label="Prizes">
        <input value={form.prizes} onChange={set('prizes')} className="input-field" placeholder="e.g. Top 3 get certificates" />
      </FormField>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderTop: '1px solid #263241', paddingTop: '1rem' }}>
        <button onClick={() => { setCreateOpen(false); setEditTarget(null); }} className="btn-secondary btn-sm">Cancel</button>
        <button onClick={editTarget ? handleEdit : handleCreate} className="btn-primary btn-sm">
          {editTarget ? 'Save Changes' : 'Create Contest'}
        </button>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Manage Contests">
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#4a5568' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field" placeholder="Search contests…" style={{ paddingLeft: '2rem' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="select-field">
          <option value="all">All Status</option>
          {STATUS_OPTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <button onClick={openCreate} className="btn-primary btn-sm">
          <Plus size={14} /> Add Contest
        </button>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #263241' }}>
          <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{filtered.length} contests</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table-base">
            <thead>
              <tr>
                <th>Contest</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Duration</th>
                <th>Participants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <Trophy size={28} color="#263241" />
                      <p>No contests found.</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 500, color: '#F1F5F9' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#4a5568', fontFamily: 'JetBrains Mono, monospace' }}>{c.shortName}</div>
                  </td>
                  <td>{statusBadge(c.status)}</td>
                  <td style={{ fontSize: '0.8125rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={12} />
                    {new Date(c.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} /> {c.duration}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => setParticipantsTarget(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94A3B8', fontSize: '0.875rem' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#38BDF8'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                      <Users size={13} /> {c.participants}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => openEdit(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', padding: '0.25rem' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#38BDF8'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', padding: '0.25rem' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#EF4444'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create modal */}
      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create Contest" maxWidth="580px">
        <ContestForm />
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title={`Edit: ${editTarget?.name || ''}`} maxWidth="580px">
        {editTarget && <ContestForm />}
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Contest" maxWidth="400px">
        {deleteTarget && (
          <div>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              Delete <strong style={{ color: '#F1F5F9' }}>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteTarget(null)} className="btn-secondary btn-sm">Cancel</button>
              <button onClick={handleDelete} className="btn-danger btn-sm">Delete Contest</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Participants modal */}
      <Modal isOpen={!!participantsTarget} onClose={() => setParticipantsTarget(null)} title={`Participants — ${participantsTarget?.name || ''}`} maxWidth="480px">
        {participantsTarget && (
          <div>
            <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginBottom: '1rem' }}>
              {participantsTarget.participants} registered students. Showing sample list.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {STUDENTS.slice(0, participantsTarget.participants || 5).map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: '1px solid #1a2535' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #38BDF8, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#0B0F14', flexShrink: 0 }}>{s.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', color: '#F1F5F9', fontWeight: 500 }}>{s.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>{s.uid} · {s.section}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#4a5568', marginTop: '0.75rem' }}>Demo data — participant list requires backend integration.</p>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}

