// Register.jsx — registration with validation and password strength
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const getPasswordStrength = (pwd) => {
  if (!pwd) return { score: 0, label: '', color: '#263241' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { score: 0, label: '', color: '#263241' },
    { score: 1, label: 'Weak', color: '#EF4444' },
    { score: 2, label: 'Fair', color: '#F59E0B' },
    { score: 3, label: 'Good', color: '#22C55E' },
    { score: 4, label: 'Strong', color: '#22C55E' },
  ];
  return map[score];
};

const SECTIONS = ['CS-A', 'CS-B', 'CS-C', 'CS-D', 'IT-A', 'IT-B'];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', uid: '', section: 'CS-A', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = getPasswordStrength(form.password);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.endsWith('@university.edu')) errs.email = 'Must be a @university.edu email.';
    if (!/^20\d{2}(CS|IT)\d{3}$/.test(form.uid)) errs.uid = 'UID format: e.g. 2024CS007';
    if (form.password.length < 8) errs.password = 'Minimum 8 characters.';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';
    if (!agreed) errs.agreed = 'You must accept the terms.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    register(form);
    setLoading(false);
    toast.success('Account created! Welcome to CodeForge. (Demo Mode)');
    navigate('/dashboard');
  };

  const Field = ({ id, label, error, children }) => (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: '#94A3B8', marginBottom: '0.4rem' }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="auth-register-card" style={{ maxWidth: '480px', width: '100%', background: '#151E29', border: '1px solid #263241', borderRadius: '8px', padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#38BDF8', borderRadius: '6px', padding: '4px 6px' }}><Code2 size={16} color="#0B0F14" strokeWidth={2.5} /></div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#F1F5F9' }}>Code<span style={{ color: '#38BDF8' }}>Forge</span></span>
        </div>

        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '0.35rem' }}>Create your account</h1>
        <p style={{ color: '#94A3B8', fontSize: '0.8125rem', marginBottom: '1.75rem' }}>Join CodeForge with your university credentials.</p>

        <div style={{ padding: '0.65rem', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.75rem', color: '#94A3B8' }}>
          <span style={{ color: '#38BDF8', fontWeight: 500 }}>Demo:</span> Use any @university.edu email. No real data is stored.
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <Field id="reg-name" label="Full Name" error={errors.name}>
            <input id="reg-name" type="text" value={form.name} onChange={set('name')} className="input-field" placeholder="e.g. Aryan Mehta" />
          </Field>

          <Field id="reg-email" label="University Email" error={errors.email}>
            <input id="reg-email" type="email" value={form.email} onChange={set('email')} className="input-field" placeholder="you@university.edu" />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Field id="reg-uid" label="Student UID" error={errors.uid}>
              <input id="reg-uid" type="text" value={form.uid} onChange={set('uid')} className="input-field" placeholder="2024CS007" />
            </Field>
            <Field id="reg-section" label="Section" error={errors.section}>
              <select id="reg-section" value={form.section} onChange={set('section')} className="select-field" style={{ width: '100%' }}>
                {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field id="reg-password" label="Password" error={errors.password}>
            <div style={{ position: 'relative' }}>
              <input id="reg-password" type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')} className="input-field" placeholder="Min. 8 characters" style={{ paddingRight: '2.5rem' }} />
              <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex' }}>
                {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {form.password && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= strength.score ? strength.color : '#263241', transition: 'background 0.3s' }} />
                  ))}
                </div>
                {strength.label && <span style={{ fontSize: '0.7rem', color: strength.color }}>{strength.label} password</span>}
              </div>
            )}
          </Field>

          <Field id="reg-confirm" label="Confirm Password" error={errors.confirm}>
            <div style={{ position: 'relative' }}>
              <input id="reg-confirm" type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={set('confirm')} className="input-field" placeholder="Repeat your password" style={{ paddingRight: '2.5rem' }} />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex' }}>
                {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {form.confirm && form.confirm === form.password && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '4px' }}>
                <CheckCircle2 size={12} color="#22C55E" />
                <span style={{ fontSize: '0.7rem', color: '#22C55E' }}>Passwords match</span>
              </div>
            )}
          </Field>

          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <input id="terms" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="checkbox-custom" style={{ marginTop: '2px' }} />
              <label htmlFor="terms" style={{ fontSize: '0.8125rem', color: '#94A3B8', cursor: 'pointer', lineHeight: 1.5 }}>
                I agree to the <span style={{ color: '#38BDF8' }}>Terms of Service</span> and <span style={{ color: '#38BDF8' }}>Privacy Policy</span>.
              </label>
            </div>
            {errors.agreed && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem' }}>{errors.agreed}</p>}
          </div>

          <button id="register-submit" type="submit" className="btn-primary" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.6rem', fontSize: '0.9375rem' }}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
