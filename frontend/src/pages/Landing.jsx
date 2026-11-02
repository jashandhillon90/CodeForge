// Landing.jsx — public homepage
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Code2, Zap, Trophy, BarChart2, Users, ArrowRight, CheckCircle2, Clock, Star } from 'lucide-react';

const UPCOMING_CONTESTS = [
  { name: "Campus Coding Championship 2026", date: "Nov 10, 2026", duration: "6 hrs", participants: 34, status: "upcoming" },
  { name: "Algorithm Sprint — Session 3", date: "Nov 15, 2026", duration: "2 hrs", participants: 12, status: "upcoming" },
  { name: "Freshers Coding Challenge 2026", date: "Nov 20, 2026", duration: "2 hrs", participants: 5, status: "upcoming" },
];

const TOPICS = [
  { name: "Arrays", count: 5, color: "#38BDF8" },
  { name: "Dynamic Programming", count: 7, color: "#22C55E" },
  { name: "Graphs", count: 5, color: "#F59E0B" },
  { name: "Strings", count: 3, color: "#a855f7" },
  { name: "Binary Search", count: 3, color: "#38BDF8" },
  { name: "Trees", count: 4, color: "#22C55E" },
  { name: "Greedy", count: 2, color: "#F59E0B" },
  { name: "Stack", count: 2, color: "#EF4444" },
];

const CODE_DEMO = `class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, n in enumerate(nums):
            complement = target - n
            if complement in seen:
                return [seen[complement], i]
            seen[n] = i`;

const HOW_IT_WORKS = [
  { step: "01", title: "Create Your Account", desc: "Register with your university email and student UID to get started on the platform." },
  { step: "02", title: "Practice Problems", desc: "Browse our curated problem library filtered by topic, difficulty, and your progress." },
  { step: "03", title: "Join Contests", desc: "Compete in weekly challenges and campus tournaments to earn rating points." },
  { step: "04", title: "Track & Improve", desc: "Analyze your performance with detailed charts and climb the campus leaderboard." },
];

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F14' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', padding: '120px 1.5rem 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '999px', marginBottom: '1.5rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} className="pulse-soft" />
              <span style={{ fontSize: '0.8125rem', color: '#38BDF8', fontWeight: 500 }}>Live on Campus Network</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, color: '#F1F5F9', lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              Your Campus.<br />Your Competition.<br /><span style={{ color: '#38BDF8' }}>Your Code.</span>
            </h1>

            <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '420px' }}>
              Practice problems, compete with fellow students, and build your problem-solving skills on one unified platform.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/problems" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9375rem' }}>
                Explore Problems <ArrowRight size={15} />
              </Link>
              <Link to="/contests" className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9375rem' }}>
                Join a Contest <Trophy size={15} />
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem' }}>
              {[['200+', 'Students'], ['20+', 'Problems'], ['6+', 'Contests']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F1F5F9' }}>{num}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Code preview */}
          <div style={{ background: '#101720', border: '1px solid #263241', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #263241', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginLeft: '0.5rem' }}>solution.py — Two Sum</span>
              <span className="pill badge-easy" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>Easy</span>
            </div>
            <div style={{ padding: '1.25rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem', lineHeight: 1.9 }}>
              {CODE_DEMO.split('\n').map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#263241', minWidth: '20px', textAlign: 'right', userSelect: 'none' }}>{i + 1}</span>
                  <span style={{ color: i === 0 ? '#a855f7' : i === 1 ? '#38BDF8' : i >= 2 && i <= 3 ? '#94A3B8' : i === 4 ? '#22C55E' : i === 5 ? '#F59E0B' : '#94A3B8' }}>
                    {line || '\u00A0'}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #263241', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#22C55E' }}>✓ Accepted</span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>· Runtime: 48ms · Memory: 16.4MB</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: '#0d1117', borderTop: '1px solid #263241', borderBottom: '1px solid #263241', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Everything you need to excel
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>A complete competitive programming ecosystem built for campus students.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: Code2, title: 'Rich Code Editor', desc: 'Monaco-powered editor with syntax highlighting for C++, Java, and Python.', color: '#38BDF8' },
              { icon: Trophy, title: 'Live Contests', desc: 'Compete in weekly challenges and campus tournaments with real-time rankings.', color: '#F59E0B' },
              { icon: BarChart2, title: 'Performance Analytics', desc: 'Detailed charts to track your progress, topic mastery, and improvement trends.', color: '#22C55E' },
              { icon: Users, title: 'Campus Leaderboard', desc: 'Compete with fellow students and see your ranking across sections and batches.', color: '#a855f7' },
              { icon: Zap, title: 'Instant Feedback', desc: 'Get immediate verdict on your submissions with detailed test case results.', color: '#38BDF8' },
              { icon: Star, title: 'Rating System', desc: 'Earn and maintain your competitive rating that reflects your true skill level.', color: '#F59E0B' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Icon size={18} color={color} strokeWidth={1.75} />
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '0.4rem' }}>{title}</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.8125rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>How CodeForge works</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>Get started in minutes. No setup required.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#263241', fontFamily: "'JetBrains Mono', monospace" }}>{step}</span>
              <h3 style={{ fontWeight: 600, color: '#F1F5F9', fontSize: '0.9375rem' }}>{title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.8125rem', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Contests */}
      <section style={{ background: '#0d1117', borderTop: '1px solid #263241', borderBottom: '1px solid #263241', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.02em' }}>Upcoming Contests</h2>
            <Link to="/contests" className="btn-secondary btn-sm">View All</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {UPCOMING_CONTESTS.map(c => (
              <div key={c.name} className="card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9', marginBottom: '0.2rem' }}>{c.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#94A3B8', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} />{c.date}</span>
                    <span>· {c.duration}</span>
                    <span>· {c.participants} registered</span>
                  </div>
                </div>
                <span className="pill badge-upcoming">{c.status}</span>
                <Link to="/contests" className="btn-primary btn-sm">Register</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.02em' }}>Popular Topics</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginTop: '0.5rem' }}>Focus on the topics that matter for your growth.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {TOPICS.map(t => (
            <Link key={t.name} to={`/problems?topic=${t.name}`}
              style={{ padding: '0.5rem 1rem', background: '#151E29', border: '1px solid #263241', borderRadius: '6px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#38BDF8'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#263241'}>
              <span style={{ fontSize: '0.875rem', color: '#F1F5F9', fontWeight: 500 }}>{t.name}</span>
              <span style={{ fontSize: '0.75rem', color: t.color, fontWeight: 600 }}>{t.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', background: '#0d1117', borderTop: '1px solid #263241' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Ready to start competing?
          </h2>
          <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.75 }}>
            Join hundreds of students already sharpening their skills on CodeForge. It only takes 30 seconds to get started.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '0.65rem 1.75rem' }}>
              Create Account <ArrowRight size={15} />
            </Link>
            <Link to="/login" className="btn-secondary" style={{ padding: '0.65rem 1.75rem' }}>Sign In</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #263241', padding: '2rem 1.5rem', background: '#0B0F14' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ background: '#38BDF8', borderRadius: '5px', padding: '3px 5px' }}><Code2 size={13} color="#0B0F14" /></div>
            <span style={{ fontWeight: 700, color: '#F1F5F9', fontSize: '0.9375rem' }}>Code<span style={{ color: '#38BDF8' }}>Forge</span></span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#4a5568', textAlign: 'center' }}>
            Campus Competitive Learning — Full Stack II Project · Frontend Demo Build
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {[['/', 'Home'], ['/problems', 'Problems'], ['/contests', 'Contests'], ['/leaderboard', 'Leaderboard']].map(([p, l]) => (
              <Link key={p} to={p} style={{ fontSize: '0.8125rem', color: '#94A3B8', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
