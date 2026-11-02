// Dashboard.jsx — student overview dashboard
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { BookOpen, Trophy, CheckCircle2, TrendingUp, Flame, Clock, ArrowRight } from 'lucide-react';
import { DEMO_USER } from '../data/students';
import { PROBLEMS } from '../data/problems';
import { CONTESTS } from '../data/contests';
import { SUBMISSIONS, getVerdictClass, getVerdictShort } from '../data/submissions';

const STREAK_GRID = Array.from({ length: 56 }, (_, i) => {
  const rand = Math.random();
  return rand > 0.6 ? (rand > 0.85 ? 'high' : 'med') : rand > 0.4 ? 'low' : 'none';
});

export default function Dashboard() {
  const user = DEMO_USER;
  const upcomingContests = CONTESTS.filter(c => c.status === 'upcoming').slice(0, 3);
  const recentSubs = SUBMISSIONS.slice(0, 5);

  const stats = [
    { label: 'Problems Solved', value: user.solved, sub: 'of 20 total', icon: CheckCircle2, color: '#22C55E' },
    { label: 'Current Rating', value: user.rating, sub: `Max: ${user.maxRating}`, icon: TrendingUp, color: '#38BDF8' },
    { label: 'Contests', value: user.contestsParticipated, sub: 'participated', icon: Trophy, color: '#F59E0B' },
    { label: 'Acceptance Rate', value: `${user.acceptanceRate}%`, sub: 'on submissions', icon: BookOpen, color: '#a855f7' },
  ];

  const streakColor = (type) => {
    if (type === 'high') return '#22C55E';
    if (type === 'med') return '#16a34a';
    if (type === 'low') return '#166534';
    return '#1a2535';
  };

  return (
    <DashboardLayout title="Overview">
      {/* Stats grid */}
      <div className="grid-stats" style={{ marginBottom: '1.5rem' }}>
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginBottom: '0.25rem' }}>{label}</p>
                <p style={{ fontSize: '1.625rem', fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.02em' }}>{value}</p>
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>{sub}</p>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={17} color={color} strokeWidth={1.75} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Topic progress */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1.25rem' }}>Topic Progress</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {user.topicProgress.map(({ topic, solved, total }) => (
              <div key={topic}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
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

        {/* Streak */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>Activity</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#F59E0B' }}>
              <Flame size={14} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user.streak} day streak</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '3px', marginBottom: '0.75rem' }}>
            {STREAK_GRID.map((type, i) => (
              <div key={i} className="streak-cell" style={{ background: streakColor(type) }} title={`${type} activity`} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#4a5568', marginTop: '0.5rem' }}>
            <span>8 weeks ago</span>
            <span>Today</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.7rem', color: '#94A3B8' }}>
            <span>Less</span>
            {['#1a2535', '#166534', '#16a34a', '#22C55E'].map(c => (
              <div key={c} className="streak-cell" style={{ background: c, width: '12px', height: '12px' }} />
            ))}
            <span>More</span>
          </div>

          {/* Recent activity */}
          <div style={{ marginTop: '1.25rem', borderTop: '1px solid #263241', paddingTop: '1rem' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '0.75rem' }}>Recent Activity</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {user.recentActivity.map((act, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: act.type === 'solved' ? '#22C55E' : '#38BDF8', marginTop: '5px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8125rem', color: '#F1F5F9' }}>
                      {act.type === 'solved' ? `Solved ${act.problem}` : `${act.name} — ${act.result}`}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{act.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Recent submissions */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #263241', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>Recent Submissions</h3>
            <Link to="/submissions" style={{ fontSize: '0.8125rem', color: '#38BDF8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <table className="table-base">
            <thead>
              <tr><th>Problem</th><th>Lang</th><th>Verdict</th></tr>
            </thead>
            <tbody>
              {recentSubs.map(s => (
                <tr key={s.id}>
                  <td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Link to={`/problems/${s.problemId}`} style={{ color: '#F1F5F9', textDecoration: 'none' }}>{s.problem}</Link>
                  </td>
                  <td style={{ color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>{s.language}</td>
                  <td><span className={`pill ${getVerdictClass(s.verdict)}`} style={{ fontSize: '0.7rem' }}>{getVerdictShort(s.verdict)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming contests */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>Upcoming Contests</h3>
            <Link to="/contests" style={{ fontSize: '0.8125rem', color: '#38BDF8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {upcomingContests.map(c => (
              <Link key={c.id} to={`/contests/${c.id}`} style={{ display: 'block', padding: '0.75rem', background: '#0B0F14', border: '1px solid #263241', borderRadius: '7px', textDecoration: 'none', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#38BDF8'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#263241'}>
                <div style={{ fontWeight: 500, fontSize: '0.875rem', color: '#F1F5F9', marginBottom: '0.25rem' }}>{c.name}</div>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: '#94A3B8', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={11} />{new Date(c.startDate).toLocaleDateString()}</span>
                  <span>· {c.duration}</span>
                  <span className="pill badge-upcoming" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>Upcoming</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
