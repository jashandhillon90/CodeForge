import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import NotFoundState from './components/common/NotFoundState.jsx';

// Public pages
const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));

// Student pages
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Problems = lazy(() => import('./pages/Problems.jsx'));
const ProblemDetails = lazy(() => import('./pages/ProblemDetails.jsx'));
const Contests = lazy(() => import('./pages/Contests.jsx'));
const ContestDetails = lazy(() => import('./pages/ContestDetails.jsx'));
const Leaderboard = lazy(() => import('./pages/Leaderboard.jsx'));
const Submissions = lazy(() => import('./pages/Submissions.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const AdminProblems = lazy(() => import('./pages/admin/AdminProblems.jsx'));
const AdminContests = lazy(() => import('./pages/admin/AdminContests.jsx'));

function LoadingState({ message = 'Loading your workspace…' }) {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="route-loading-indicator" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingState />;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<LoadingState message="Loading page…" />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student (protected) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
        <Route path="/problems/:id" element={<ProtectedRoute><ProblemDetails /></ProtectedRoute>} />
        <Route path="/contests" element={<ProtectedRoute><Contests /></ProtectedRoute>} />
        <Route path="/contests/:id" element={<ProtectedRoute><ContestDetails /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        {/* Admin (protected, admin only) */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/problems" element={<ProtectedRoute adminOnly><AdminProblems /></ProtectedRoute>} />
        <Route path="/admin/contests" element={<ProtectedRoute adminOnly><AdminContests /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<NotFoundState />} />
      </Routes>
    </Suspense>
  );
}
