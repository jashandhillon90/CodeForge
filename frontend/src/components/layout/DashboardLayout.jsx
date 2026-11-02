// DashboardLayout.jsx — shell layout for authenticated pages
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function DashboardLayout({ children, title }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F14' }}>
      <TopBar title={title} />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content" style={{ padding: '1.5rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
