// AuthContext.jsx — frontend-only demo authentication
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore demo session from localStorage
    const stored = localStorage.getItem('cf_demo_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('cf_demo_user'); }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Frontend demo: accept any @university.edu email
    if (email.endsWith('@university.edu') || email === 'demo@demo.com') {
      const demoUser = {
        id: 16,
        name: email === 'admin@university.edu' ? 'Admin User' : 'Demo Student',
        email,
        uid: '2024CS099',
        section: 'CS-B',
        role: email === 'admin@university.edu' ? 'admin' : 'student',
        rating: 1356,
        avatar: email === 'admin@university.edu' ? 'AU' : 'DS',
      };
      setUser(demoUser);
      localStorage.setItem('cf_demo_user', JSON.stringify(demoUser));
      return { success: true, user: demoUser };
    }
    return { success: false, error: 'Use a @university.edu email for demo login.' };
  };

  const register = (data) => {
    const demoUser = {
      id: 99,
      name: data.name,
      email: data.email,
      uid: data.uid,
      section: data.section,
      role: 'student',
      rating: 1200,
      avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    };
    setUser(demoUser);
    localStorage.setItem('cf_demo_user', JSON.stringify(demoUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cf_demo_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
