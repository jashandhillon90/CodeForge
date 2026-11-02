// Analytics.jsx — performance analytics with Recharts
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';

const SOLVED_OVER_TIME = [
  { month: 'Jun', solved: 0 }, { month: 'Jul', solved: 1 }, { month: 'Aug', solved: 2 },
  { month: 'Sep', solved: 5 }, { month: 'Oct', solved: 9 }, { month: 'Nov', solved: 12 },
];

const MONTHLY_ACTIVITY = [
  { day: 'Mon', submissions: 3 }, { day: 'Tue', submissions: 1 }, { day: 'Wed', submissions: 4 },
  { day: 'Thu', submissions: 2 }, { day: 'Fri', submissions: 6 }, { day: 'Sat', submissions: 5 }, { day: 'Sun', submissions: 2 },
];

const DIFFICULTY_DIST = [
  { name: 'Easy', value: 7, color: '#22C55E' },
  { name: 'Medium', value: 4, color: '#F59E0B' },
  { name: 'Hard', value: 1, color: '#EF4444' },
];

const TOPIC_RADAR = [
  { topic: 'Arrays', score: 80 }, { topic: 'DP', score: 43 }, { topic: 'Graphs', score: 20 },
  { topic: 'Trees', score: 25 }, { topic: 'Strings', score: 0 }, { topic: 'BinSearch', score: 67 },
  { topic: 'Greedy', score: 0 }, { topic: 'Stack', score: 50 },
];

const RATING_HISTORY = [
  { contest: 'Start', rating: 1200 }, { contest: 'CWC-10', rating: 1156 }, { contest: 'DSB-01', rating: 1302 },
  { contest: 'CWC-11', rating: 1356 },
];

const VERDICT_DIST = [
  { name: 'AC', value: 8, color: '#22C55E' },
  { name: 'WA', value: 4, color: '#EF4444' },
  { name: 'TLE', value: 1, color: '#F59E0B' },
  { name: 'CE', value: 1, color: '#94A3B8' },
  { name: 'MLE', value: 1, color: '#a855f7' },
];

const tooltipStyle = { backgroundColor: '#151E29', border: '1px solid #263241', borderRadius: '6px', fontSize: '0.8125rem', color: '#F1F5F9' };
const gridStyle = { stroke: '#1a2535' };

export default function Analytics() {
  return (
    <DashboardLayout title="Analytics">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Row 1: Rating + Solved over time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1.25rem' }}>Rating History</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={RATING_HISTORY}>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="contest" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="rating" stroke="#38BDF8" strokeWidth={2} dot={{ fill: '#38BDF8', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1.25rem' }}>Problems Solved Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SOLVED_OVER_TIME}>
                <CartesianGrid {...gridStyle} />
                <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="solved" fill="#38BDF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Topic radar + Difficulty pie + Verdict pie */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1.25rem' }}>Topic Mastery</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={TOPIC_RADAR}>
                <PolarGrid stroke="#263241" />
                <PolarAngleAxis dataKey="topic" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <Radar dataKey="score" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.15} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1.25rem' }}>Difficulty Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={DIFFICULTY_DIST} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {DIFFICULTY_DIST.map(d => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend formatter={(v) => <span style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1.25rem' }}>Verdict Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={VERDICT_DIST} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {VERDICT_DIST.map(d => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend formatter={(v) => <span style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 3: Weekly activity */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '1.25rem' }}>This Week's Activity</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={MONTHLY_ACTIVITY}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="submissions" fill="#22C55E" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {[
            { label: 'Acceptance Rate', value: '53%', sub: '8 of 15 submissions' },
            { label: 'Best Streak', value: '7 days', sub: 'Current streak' },
            { label: 'Avg. Runtime', value: '28ms', sub: 'Accepted solutions' },
            { label: 'Contests', value: '3', sub: 'Total participated' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="stat-card">
              <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginBottom: '0.25rem' }}>{label}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#38BDF8', letterSpacing: '-0.02em' }}>{value}</p>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>{sub}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.75rem', color: '#4a5568', textAlign: 'center' }}>
          All analytics charts are based on frontend demo data and do not reflect real backend calculations.
        </p>
      </div>
    </DashboardLayout>
  );
}
