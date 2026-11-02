// AdminProblems.jsx — full CRUD for problems using local state
import { useState, useMemo } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import Modal from '../../components/common/Modal.jsx';
import DifficultyBadge from '../../components/common/DifficultyBadge.jsx';
import { Plus, Search, Edit2, Trash2, SlidersHorizontal, BookOpen } from 'lucide-react';
import { PROBLEMS as INITIAL_PROBLEMS, TOPICS, DIFFICULTIES } from '../../data/problems.js';
import toast from 'react-hot-toast';

const BLANK_FORM = {
  title: '', description: '', difficulty: 'Easy', topic: 'Arrays',
  inputFormat: '', outputFormat: '', constraints: '', acceptance: 65,
  examples: [{ input: '', output: '', explanation: '' }],
};

export default function AdminProblems() {
  const [problems, setProblems] = useState(INITIAL_PROBLEMS);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ ...BLANK_FORM });

  const filtered = useMemo(() => {
    let list = problems;
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (diffFilter !== 'All') list = list.filter(p => p.difficulty === diffFilter);
    if (topicFilter !== 'All') list = list.filter(p => p.topic === topicFilter);
    return list;
  }, [problems, search, diffFilter, topicFilter]);

  const set = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const openCreate = () => { setForm({ ...BLANK_FORM }); setCreateOpen(true); };

  const openEdit = (p) => {
    setEditTarget(p);
    setForm({
      title: p.title, description: p.description, difficulty: p.difficulty,
      topic: p.topic, inputFormat: p.inputFormat || '', outputFormat: p.outputFormat || '',
      constraints: (p.constraints || []).join('\n'), acceptance: p.acceptance,
      examples: p.examples || [{ input: '', output: '', explanation: '' }],
    });
  };

  const handleCreate = () => {
    if (!form.title.trim()) { toast.error('Title is required.'); return; }
    const newProblem = {
      id: Math.max(...problems.map(p => p.id)) + 1,
      title: form.title.trim(),
      description: form.description,
      difficulty: form.difficulty,
      topic: form.topic,
      inputFormat: form.inputFormat,
      outputFormat: form.outputFormat,
      constraints: form.constraints.split('\n').filter(Boolean),
      acceptance: Number(form.acceptance) || 65,
      examples: form.examples,
      tags: [form.topic],
      solved: false,
      testCases: [],
      starterCode: { python: '# Write your solution here\n', cpp: '// Write your solution here\n', java: '// Write your solution here\n' },
    };
    setProblems(prev => [...prev, newProblem]);
    setCreateOpen(false);
    toast.success(`Problem "${form.title}" created! (Demo)`);
  };

  const handleEdit = () => {
    if (!form.title.trim()) { toast.error('Title is required.'); return; }
    setProblems(prev => prev.map(p =>
      p.id === editTarget.id ? {
        ...p, title: form.title, description: form.description,
        difficulty: form.difficulty, topic: form.topic,
        inputFormat: form.inputFormat, outputFormat: form.outputFormat,
        constraints: form.constraints.split('\n').filter(Boolean),
        acceptance: Number(form.acceptance),
      } : p
    ));
    setEditTarget(null);
    toast.success(`Problem updated! (Demo)`);
  };

  const handleDelete = () => {
    setProblems(prev => prev.filter(p => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast.success(`Problem deleted. (Demo)`);
  };

  const FormField = ({ label, children }) => (
    <div>
      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#94A3B8', marginBottom: '0.35rem' }}>{label}</label>
      {children}
    </div>
  );

  const ProblemForm = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <FormField label="Title">
        <input value={form.title} onChange={set('title')} className="input-field" placeholder="e.g. Two Sum" />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
        <FormField label="Difficulty">
          <select value={form.difficulty} onChange={set('difficulty')} className="select-field" style={{ width: '100%' }}>
            {['Easy', 'Medium', 'Hard'].map(d => <option key={d}>{d}</option>)}
          </select>
        </FormField>
        <FormField label="Topic">
          <select value={form.topic} onChange={set('topic')} className="select-field" style={{ width: '100%' }}>
            {TOPICS.filter(t => t !== 'All').map(t => <option key={t}>{t}</option>)}
          </select>
        </FormField>
        <FormField label="Acceptance %">
          <input type="number" min="1" max="100" value={form.acceptance} onChange={set('acceptance')} className="input-field" />
        </FormField>
      </div>
      <FormField label="Description">
        <textarea value={form.description} onChange={set('description')} className="input-field" style={{ height: '100px', resize: 'vertical', fontFamily: 'inherit' }} placeholder="Problem statement…" />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <FormField label="Input Format">
          <textarea value={form.inputFormat} onChange={set('inputFormat')} className="input-field" style={{ height: '70px', resize: 'vertical', fontFamily: 'inherit' }} />
        </FormField>
        <FormField label="Output Format">
          <textarea value={form.outputFormat} onChange={set('outputFormat')} className="input-field" style={{ height: '70px', resize: 'vertical', fontFamily: 'inherit' }} />
        </FormField>
      </div>
      <FormField label="Constraints (one per line)">
        <textarea value={form.constraints} onChange={set('constraints')} className="input-field" style={{ height: '70px', resize: 'vertical', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem' }} placeholder="1 <= n <= 10^4" />
      </FormField>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderTop: '1px solid #263241', paddingTop: '1rem' }}>
        <button onClick={() => { setCreateOpen(false); setEditTarget(null); }} className="btn-secondary btn-sm">Cancel</button>
        <button onClick={editTarget ? handleEdit : handleCreate} className="btn-primary btn-sm">
          {editTarget ? 'Save Changes' : 'Create Problem'}
        </button>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Manage Problems">
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#4a5568' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field" placeholder="Search problems…" style={{ paddingLeft: '2rem' }} />
        </div>
        <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)} className="select-field">
          {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)} className="select-field">
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
        <button onClick={() => { setSearch(''); setDiffFilter('All'); setTopicFilter('All'); }} className="btn-secondary btn-sm">
          <SlidersHorizontal size={13} /> Reset
        </button>
        <button onClick={openCreate} className="btn-primary btn-sm">
          <Plus size={14} /> Add Problem
        </button>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #263241', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{filtered.length} problems</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table-base">
            <thead>
              <tr>
                <th style={{ width: '48px' }}>#</th>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Topic</th>
                <th>Acceptance</th>
                <th style={{ width: '100px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <BookOpen size={28} color="#263241" />
                      <p>No problems match your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>{p.id}</td>
                  <td style={{ fontWeight: 500, color: '#F1F5F9', maxWidth: '240px' }}>
                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                  </td>
                  <td><DifficultyBadge difficulty={p.difficulty} /></td>
                  <td><span className="tag-pill" style={{ fontSize: '0.75rem' }}>{p.topic}</span></td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#94A3B8' }}>{p.acceptance}%</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => openEdit(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', padding: '0.25rem' }} title="Edit"
                        onMouseEnter={e => e.currentTarget.style.color = '#38BDF8'} onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', padding: '0.25rem' }} title="Delete"
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
      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create Problem" maxWidth="640px">
        <ProblemForm />
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title={`Edit: ${editTarget?.title || ''}`} maxWidth="640px">
        {editTarget && <ProblemForm />}
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Problem" maxWidth="400px">
        {deleteTarget && (
          <div>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              Are you sure you want to delete <strong style={{ color: '#F1F5F9' }}>{deleteTarget.title}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteTarget(null)} className="btn-secondary btn-sm">Cancel</button>
              <button onClick={handleDelete} className="btn-danger btn-sm">Delete Problem</button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}

