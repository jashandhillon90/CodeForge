// ContestDetails.jsx — full contest detail page with registration
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Clock, Users, Calendar, ChevronLeft, CheckCircle2, BookOpen, Trophy } from 'lucide-react';
import { CONTESTS } from '../data/contests';
import { PROBLEMS } from '../data/problems';
import DifficultyBadge from '../components/common/DifficultyBadge';
import NotFoundState from '../components/common/NotFoundState';
import toast from 'react-hot-toast';

const statusBadge = (status) => {
  const map = { upcoming: 'badge-upcoming', ongoing: 'badge-ongoing', past: 'badge-past' };
  const label = { upcoming: 'Upcoming', ongoing: 'Live Now', past: 'Ended' };
  return <span className={`pill ${map[status]}`} style={{ fontSize: '0.8125rem' }}>{label[status]}</span>;
};

export default function ContestDetails() {
  const { id } = useParams();
  const routeContest = CONTESTS.find(c => c.id === Number(id));
  const [contest, setContest] = useState(routeContest);
  useEffect(() => setContest(routeContest), [id]);

  if (!routeContest || !contest) {
    return <NotFoundState message="This contest may have been removed or the link may be incorrect." backTo="/contests" backLabel="Back to Contests" />;
  }

  const contestProblems = PROBLEMS.filter(p => contest.problems.includes(p.id));

  const handleRegister = () => {
    setContest(prev => ({ ...prev, registered: true, participants: prev.participants + 1 }));
    toast.success(`You're registered for ${contest.name}! (Demo)`);
  };

  const handleUnregister = () => {
    setContest(prev => ({ ...prev, registered: false, participants: prev.participants - 1 }));
    toast('Registration cancelled. (Demo)');
  };

  return (
    <DashboardLayout title={contest.name}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/contests" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#94A3B8', textDecoration: 'none', fontSize: '0.8125rem' }}>
          <ChevronLeft size={14} /> Back to Contests
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.25rem', alignItems: 'start' }}>
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Header */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#F1F5F9' }}>{contest.name}</h1>
                  {statusBadge(contest.status)}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '1rem' }}>{contest.description}</p>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#94A3B8', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} />{new Date(contest.startDate).toLocaleString()}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} />{contest.duration}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Users size={14} />{contest.participants} registered</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><BookOpen size={14} />{contest.problems.length} problems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Problems */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #263241' }}>
              <h2 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>Problems ({contestProblems.length})</h2>
            </div>
            <table className="table-base">
              <thead>
                <tr><th>#</th><th>Problem</th><th>Difficulty</th><th>Topic</th></tr>
              </thead>
              <tbody>
                {contestProblems.map((p, i) => (
                  <tr key={p.id}>
                    <td style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>{String.fromCharCode(65 + i)}</td>
                    <td>
                      {contest.status === 'past' ? (
                        <Link to={`/problems/${p.id}`} style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: 500 }}>{p.title}</Link>
                      ) : (
                        <span style={{ color: '#F1F5F9', fontWeight: 500 }}>{p.title}</span>
                      )}
                    </td>
                    <td><DifficultyBadge difficulty={p.difficulty} /></td>
                    <td><span className="tag-pill" style={{ fontSize: '0.75rem' }}>{p.topic}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rules */}
          {contest.rules.length > 0 && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <h2 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1rem' }}>Rules</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {contest.rules.map((r, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle2 size={14} color="#38BDF8" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Register card */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Trophy size={16} color="#F59E0B" />
              <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>Registration</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[['Status', statusBadge(contest.status)], ['Participants', contest.participants], ['Prizes', contest.prizes.slice(0, 60) + (contest.prizes.length > 60 ? '…' : '')]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{k}</span>
                  {typeof v === 'string' ? <span style={{ fontSize: '0.8125rem', color: '#F1F5F9' }}>{v}</span> : v}
                </div>
              ))}
            </div>
            {contest.status === 'upcoming' ? (
              contest.registered ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#22C55E', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>
                    <CheckCircle2 size={15} /> Registered
                  </div>
                  <button onClick={handleUnregister} className="btn-danger" style={{ width: '100%', justifyContent: 'center' }}>
                    Cancel Registration
                  </button>
                </div>
              ) : (
                <button id="register-contest-btn" onClick={handleRegister} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Register Now
                </button>
              )
            ) : contest.status === 'ongoing' ? (
              <button className="btn-success" style={{ width: '100%', justifyContent: 'center' }}>
                Enter Contest
              </button>
            ) : (
              <button className="btn-secondary" disabled style={{ width: '100%', justifyContent: 'center', opacity: 0.5 }}>
                Contest Ended
              </button>
            )}
            <p style={{ fontSize: '0.7rem', color: '#4a5568', textAlign: 'center', marginTop: '0.6rem' }}>
              [Demo] Registration is simulated on the frontend only.
            </p>
          </div>

          {/* Contest info */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.875rem', color: '#F1F5F9', marginBottom: '0.75rem' }}>Info</h3>
            {[
              ['Contest ID', contest.shortName],
              ['Start Time', new Date(contest.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })],
              ['Date', new Date(contest.startDate).toLocaleDateString()],
              ['Duration', contest.duration],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1a2535' }}>
                <span style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{k}</span>
                <span style={{ fontSize: '0.8125rem', color: '#F1F5F9', fontFamily: 'JetBrains Mono, monospace' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
