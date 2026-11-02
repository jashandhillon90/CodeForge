// AdminDashboard.jsx — admin overview
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import { Users, BookOpen, Trophy, FileText, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { PROBLEMS } from '../../data/problems.js';
import { CONTESTS } from '../../data/contests.js';
import { STUDENTS } from '../../data/students.js';
import { SUBMISSIONS } from '../../data/submissions.js';

const RECENT_ACTIVITY = [
  { type: 'submission', text: 'New submission for Two Sum', user: 'Aryan Mehta', time: '2 min ago', status: 'Accepted' },
  { type: 'registration', text: 'Registered for Campus Championship', user: 'Priya Singh', time: '8 min ago', status: null },
  { type: 'submission', text: 'New submission for Climbing Stairs', user: 'Karan Shah', time: '15 min ago', status: 'Wrong Answer' },
  { type: 'registration', text: 'New student registered', user: 'Meera Patel', time: '1 hour ago', status: null },
  { type: 'submission', text: 'New submission for Max Subarray', user: 'Rahul Verma', time: '2 hours ago', status: 'Accepted' },
];

export default function AdminDashboard() {
  const activeContests = CONTESTS.filter(c => c.status === 'ongoing').length;
  const upcomingContests = CONTESTS.filter(c => c.status === 'upcoming').length;
  const totalSubmissions = SUBMISSIONS.length;
  const acSubmissions = SUBMISSIONS.filter(s => s.verdict === 'Accepted').length;

  const stats = [
    { label: 'Total Students', value: STUDENTS.length, icon: Users, color: '#38BDF8', link: null },
    { label: 'Total Problems', value: PROBLEMS.length, icon: BookOpen, color: '#22C55E', link: '/admin/problems' },
    { label: 'Active Contests', value: activeContests, sub: `${upcomingContests} upcoming`, icon: Trophy, color: '#F59E0B', link: '/admin/contests' },
    { label: 'Total Submissions', value: totalSubmissions, sub: `${acSubmissions} accepted`, icon: FileText, color: '#a855f7', link: null },
  ];

  return (
    <AdminLayout title="Admin Overview">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {stats.map(({ label, value, sub, icon: Icon, color, link }) => (
          <div key={label} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginBottom: '0.25rem' }}>{label}</p>
                <p style={{ fontSize: '1.625rem', fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.02em' }}>{value}</p>
                {sub && <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>{sub}</p>}
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={17} color={color} strokeWidth={1.75} />
              </div>
            </div>
            {link && (
              <Link to={link} style={{ fontSize: '0.8125rem', color: '#38BDF8', textDecoration: 'none' }}>
                Manage →
              </Link>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem' }}>
        {/* Recent activity */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #263241' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>Recent Activity</h3>
          </div>
          <div>
            {RECENT_ACTIVITY.map((act, i) => (
              <div key={i} style={{ padding: '0.875rem 1.25rem', borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid #1a2535' : 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: act.type === 'submission' ? 'rgba(56,189,248,0.1)' : 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {act.type === 'submission' ? <FileText size={14} color="#38BDF8" /> : <Users size={14} color="#22C55E" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: '#F1F5F9', fontWeight: 500 }}>{act.text}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.15rem' }}>
                    <span>{act.user}</span>
                    {act.status && (
                      <span style={{ color: act.status === 'Accepted' ? '#22C55E' : '#EF4444' }}>· {act.status}</span>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#4a5568', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={11} /> {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats + quick links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Contest breakdown */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1rem' }}>Contest Status</h3>
            {[
              { label: 'Ongoing', value: CONTESTS.filter(c => c.status === 'ongoing').length, color: '#22C55E' },
              { label: 'Upcoming', value: CONTESTS.filter(c => c.status === 'upcoming').length, color: '#38BDF8' },
              { label: 'Past', value: CONTESTS.filter(c => c.status === 'past').length, color: '#94A3B8' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #1a2535' }}>
                <span style={{ fontSize: '0.875rem', color: '#94A3B8' }}>{label}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Problem breakdown */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1rem' }}>Problem Breakdown</h3>
            {[
              { label: 'Easy', value: PROBLEMS.filter(p => p.difficulty === 'Easy').length, color: '#22C55E' },
              { label: 'Medium', value: PROBLEMS.filter(p => p.difficulty === 'Medium').length, color: '#F59E0B' },
              { label: 'Hard', value: PROBLEMS.filter(p => p.difficulty === 'Hard').length, color: '#EF4444' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #1a2535' }}>
                <span style={{ fontSize: '0.875rem', color: '#94A3B8' }}>{label}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color }}>{value}</span>
              </div>
            ))}
            <Link to="/admin/problems" style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.8125rem', color: '#38BDF8', textDecoration: 'none' }}>
              Manage Problems →
            </Link>
          </div>

          {/* Acceptance rate */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '0.5rem' }}>Platform Acceptance Rate</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#22C55E', letterSpacing: '-0.02em' }}>
              {Math.round((acSubmissions / totalSubmissions) * 100)}%
            </p>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem' }}>
              {acSubmissions} of {totalSubmissions} submissions accepted
            </p>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: '#4a5568', textAlign: 'center', marginTop: '1.5rem' }}>
        Admin panel — frontend demo only. All CRUD operations use local state and are not persisted to any backend.
      </p>
    </AdminLayout>
  );
}

