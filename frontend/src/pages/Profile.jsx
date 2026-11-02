// Profile.jsx — student profile with editable fields
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Edit2, Save, X, Trophy, CheckCircle2, Star } from 'lucide-react';
import { DEMO_USER } from '../data/students';
import { CONTESTS } from '../data/contests';
import toast from 'react-hot-toast';

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ ...DEMO_USER });
  const [draft, setDraft] = useState({ ...DEMO_USER });

  const pastContests = CONTESTS.filter(c => c.status === 'past');

  const handleSave = () => {
    setProfile({ ...draft });
    setEditing(false);
    toast.success('Profile updated! (Demo — changes are not persisted to any server)');
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setEditing(false);
  };

  const set = (field) => (e) => setDraft(d => ({ ...d, [field]: e.target.value }));

  return (
    <DashboardLayout title="Profile">
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.25rem', alignItems: 'start' }}>
        {/* Left: avatar + info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div className="avatar-lg" style={{ margin: '0 auto 1rem' }}>{profile.avatar}</div>
            <h2 style={{ fontWeight: 700, fontSize: '1.0625rem', color: '#F1F5F9', marginBottom: '0.2rem' }}>{profile.name}</h2>
            <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginBottom: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>{profile.uid}</p>
            <span className="pill badge-upcoming" style={{ fontSize: '0.8rem' }}>{profile.section}</span>
            <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '0.75rem' }}>{profile.bio}</p>
            <div style={{ borderTop: '1px solid #263241', marginTop: '1rem', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[['Rating', profile.rating], ['Solved', profile.solved], ['Contests', profile.contestsParticipated], ['Rank', `#${profile.rank}`]].map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#38BDF8' }}>{v}</p>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{k}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1rem' }}>Achievements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {profile.achievements.map(a => (
                <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem', background: '#0B0F14', border: '1px solid #263241', borderRadius: '6px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{a.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F1F5F9' }}>{a.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{a.description}</p>
                    <p style={{ fontSize: '0.7rem', color: '#4a5568' }}>{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: editable profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Edit card */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>Personal Information</h3>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="btn-secondary btn-sm"><Edit2 size={13} /> Edit</button>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleSave} className="btn-primary btn-sm"><Save size={13} /> Save</button>
                  <button onClick={handleCancel} className="btn-secondary btn-sm"><X size={13} /> Cancel</button>
                </div>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Full Name', field: 'name', editable: true },
                { label: 'Email', field: 'email', editable: false },
                { label: 'Student UID', field: 'uid', editable: false },
                { label: 'Section', field: 'section', editable: false },
                { label: 'Year', field: 'year', editable: true },
                { label: 'Joined', field: 'joined', editable: false },
              ].map(({ label, field, editable }) => (
                <div key={field}>
                  <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
                  {editing && editable ? (
                    <input value={draft[field]} onChange={set(field)} className="input-field" />
                  ) : (
                    <p style={{ fontSize: '0.875rem', color: '#F1F5F9', fontWeight: 500, padding: '0.5rem 0', borderBottom: '1px solid #1a2535' }}>{profile[field]}</p>
                  )}
                </div>
              ))}
            </div>
            {editing && (
              <div style={{ marginTop: '1rem' }}>
                <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '0.3rem' }}>Bio</label>
                <textarea value={draft.bio} onChange={set('bio')} className="input-field" style={{ height: '80px', resize: 'vertical' }} />
              </div>
            )}
          </div>

          {/* Contest history */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #263241' }}>
              <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>Contest History</h3>
            </div>
            <table className="table-base">
              <thead>
                <tr><th>Contest</th><th>Date</th><th>Duration</th><th>Status</th></tr>
              </thead>
              <tbody>
                {pastContests.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 500, color: '#F1F5F9' }}>{c.name}</td>
                    <td style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>{new Date(c.startDate).toLocaleDateString()}</td>
                    <td style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>{c.duration}</td>
                    <td><span className="pill badge-past">Completed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Topic progress */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1rem' }}>Topic Progress</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              {profile.topicProgress.map(({ topic, solved, total }) => (
                <div key={topic}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: '#F1F5F9' }}>{topic}</span>
                    <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{solved}/{total}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(solved / total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
