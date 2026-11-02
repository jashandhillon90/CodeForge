// Settings.jsx — placeholder settings page
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Bell, Shield, Palette, User } from 'lucide-react';
import toast from 'react-hot-toast';

const SETTINGS_SECTIONS = [
  {
    icon: User, title: 'Account', items: [
      { label: 'Display Name', type: 'input', placeholder: 'Demo Student', id: 'setting-display-name' },
      { label: 'Email Notifications', type: 'toggle', id: 'setting-email-notif' },
    ]
  },
  {
    icon: Bell, title: 'Notifications', items: [
      { label: 'Contest reminders', type: 'toggle', id: 'setting-contest-remind', default: true },
      { label: 'Submission updates', type: 'toggle', id: 'setting-sub-update', default: true },
      { label: 'Leaderboard changes', type: 'toggle', id: 'setting-lb-change', default: false },
    ]
  },
  {
    icon: Palette, title: 'Appearance', items: [
      { label: 'Theme', type: 'select', options: ['Dark (Default)', 'Light', 'System'], id: 'setting-theme' },
      { label: 'Editor Font Size', type: 'select', options: ['12px', '13px (Default)', '14px', '16px'], id: 'setting-font-size' },
    ]
  },
  {
    icon: Shield, title: 'Privacy', items: [
      { label: 'Show profile publicly', type: 'toggle', id: 'setting-public-profile', default: true },
      { label: 'Show real name on leaderboard', type: 'toggle', id: 'setting-real-name', default: false },
    ]
  },
];

export default function Settings() {
  const [toggleValues, setToggleValues] = useState(() => Object.fromEntries(
    SETTINGS_SECTIONS.flatMap(({ items }) =>
      items.filter(item => item.type === 'toggle').map(item => [item.id, Boolean(item.default)])
    )
  ));
  const handleSave = () => toast.success('Settings saved! (Demo — no backend connected)');

  return (
    <DashboardLayout title="Settings">
      <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {SETTINGS_SECTIONS.map(({ icon: Icon, title, items }) => (
          <div key={title} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Icon size={16} color="#38BDF8" strokeWidth={1.75} />
              <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#F1F5F9' }}>{title}</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <label htmlFor={item.id} style={{ fontSize: '0.875rem', color: '#94A3B8' }}>{item.label}</label>
                  {item.type === 'toggle' && (
                    <div className="settings-toggle">
                      <input
                        id={item.id}
                        type="checkbox"
                        checked={toggleValues[item.id]}
                        onChange={e => setToggleValues(values => ({ ...values, [item.id]: e.target.checked }))}
                      />
                      <label htmlFor={item.id} aria-hidden="true" style={{
                        position: 'absolute', inset: 0, cursor: 'pointer', borderRadius: '999px',
                        background: toggleValues[item.id] ? '#38BDF8' : '#263241', transition: 'background 0.2s',
                        display: 'flex', alignItems: 'center', padding: '2px',
                      }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', marginLeft: toggleValues[item.id] ? '18px' : '0', transition: 'margin 0.2s' }} />
                      </label>
                    </div>
                  )}
                  {item.type === 'input' && (
                    <input id={item.id} type="text" className="input-field" placeholder={item.placeholder} style={{ width: '200px' }} />
                  )}
                  {item.type === 'select' && (
                    <select id={item.id} className="select-field" style={{ width: '200px' }}>
                      {item.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleSave} className="btn-primary" style={{ alignSelf: 'flex-end', padding: '0.6rem 2rem' }}>
          Save Settings
        </button>
        <p style={{ fontSize: '0.75rem', color: '#4a5568', textAlign: 'center' }}>
          Settings are demo-only. No backend is connected.
        </p>
      </div>
    </DashboardLayout>
  );
}
