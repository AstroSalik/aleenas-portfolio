import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import BooksManager from './BooksManager';
import ContentEditor from './ContentEditor';
import AwardsManager from './AwardsManager';

// SHA-256 hash of 'Bazu@Portfolio' — password never stored in plaintext
const PASSWORD_HASH = '46abe690a7e0bb11919622c1c367717721e8ebbfdfb27626c305f303c1793da8';
const SESSION_KEY   = 'aleena-admin-session';
const ATTEMPTS_KEY  = 'aleena-admin-attempts';
const SESSION_TTL   = 2 * 60 * 60 * 1000; // 2 hours in ms
const LOCKOUT_MS    = 30 * 1000;           // 30 seconds
const MAX_ATTEMPTS  = 5;

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray  = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() > data.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function getAttempts() {
  try {
    const raw = sessionStorage.getItem(ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lockedUntil: 0 };
  } catch {
    return { count: 0, lockedUntil: 0 };
  }
}

function saveAttempts(data) {
  sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify(data));
}

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getSession());
  const [password, setPassword]       = useState('');
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [lockoutSecs, setLockoutSecs] = useState(0);
  const lockoutTimer = useRef(null);
  const location = useLocation();

  // Ticker for lockout countdown
  useEffect(() => {
    const check = () => {
      const { lockedUntil } = getAttempts();
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining > 0) {
        setLockoutSecs(remaining);
      } else {
        setLockoutSecs(0);
        clearInterval(lockoutTimer.current);
      }
    };
    check();
    lockoutTimer.current = setInterval(check, 1000);
    return () => clearInterval(lockoutTimer.current);
  }, []);

  // Session expiry watcher
  useEffect(() => {
    if (!isAuthenticated) return;
    const id = setInterval(() => {
      if (!getSession()) {
        setIsAuthenticated(false);
      }
    }, 60 * 1000);
    return () => clearInterval(id);
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const attempts = getAttempts();

    if (Date.now() < attempts.lockedUntil) return;

    setLoading(true);
    try {
      const hash = await sha256(password);
      if (hash === PASSWORD_HASH) {
        // Successful login — clear attempts, create session
        saveAttempts({ count: 0, lockedUntil: 0 });
        const session = {
          token: crypto.randomUUID(),
          expiresAt: Date.now() + SESSION_TTL,
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setIsAuthenticated(true);
        setError('');
      } else {
        const newCount = attempts.count + 1;
        const lockedUntil = newCount >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_MS : 0;
        saveAttempts({ count: newCount, lockedUntil });
        if (lockedUntil) {
          setError(`Too many attempts. Locked for 30 seconds.`);
        } else {
          setError(`Incorrect password. ${MAX_ATTEMPTS - newCount} attempt${MAX_ATTEMPTS - newCount === 1 ? '' : 's'} remaining.`);
        }
      }
    } finally {
      setLoading(false);
      setPassword('');
    }
  };

  const handleLogout = () => {
    if (!window.confirm('Log out of the admin portal?')) return;
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        {/* Prevent search engine indexing of the admin login page */}
        <meta name="robots" content="noindex, nofollow" />

        <div className="min-h-screen bg-saffron-bg flex items-center justify-center font-body p-6">
          <div className="max-w-md w-full bg-saffron-surface p-8 rounded border border-saffron-primary/20 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-saffron-text mb-2">Portfolio Admin</h1>
              <p className="font-mono text-xs text-saffron-text/60 uppercase tracking-widest">Aleena Tariq Bhat</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block font-mono text-xs text-saffron-text/80 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  disabled={loading || lockoutSecs > 0}
                  autoComplete="current-password"
                  className="w-full bg-[#110609] border border-saffron-surface focus:border-saffron-primary text-saffron-text p-3 outline-none transition-colors disabled:opacity-50"
                />
                {lockoutSecs > 0 && (
                  <p className="text-amber-400 text-xs mt-2 font-mono">
                    Locked. Try again in {lockoutSecs}s.
                  </p>
                )}
                {error && !lockoutSecs && (
                  <p className="text-red-400 text-xs mt-2 font-mono">{error}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading || lockoutSecs > 0}
                className="w-full bg-saffron-primary text-saffron-bg font-mono uppercase tracking-widest text-sm font-bold py-3 hover:bg-[#c99026] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying…' : 'Enter Portal'}
              </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-saffron-primary/10">
              <Link to="/" className="font-mono text-xs text-saffron-text/50 hover:text-saffron-primary transition-colors hover:underline">
                ← Return to public site
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-saffron-bg flex flex-col md:flex-row text-saffron-text font-body">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#110609] border-r border-saffron-surface flex flex-col pt-8 pb-4 shrink-0">
        <div className="px-6 mb-12">
          <h2 className="font-display text-2xl text-saffron-primary mb-1">Admin</h2>
          <p className="font-mono text-[10px] text-saffron-text/40 uppercase tracking-widest">v1.0.0</p>
        </div>

        <nav className="flex-1 flex flex-col space-y-2 px-4">
          <NavLink to="/admin"         current={location.pathname === '/admin'}>Dashboard</NavLink>
          <NavLink to="/admin/books"   current={location.pathname === '/admin/books'}>Books Manager</NavLink>
          <NavLink to="/admin/content" current={location.pathname === '/admin/content'}>Site Content</NavLink>
          <NavLink to="/admin/awards"  current={location.pathname === '/admin/awards'}>Awards</NavLink>
        </nav>

        <div className="px-6 pt-6 border-t border-saffron-surface mt-auto space-y-4">
          <Link
            to="/"
            className="flex items-center text-sm font-mono tracking-wider text-saffron-text/60 hover:text-saffron-primary transition-colors"
          >
            <span className="mr-2">←</span> View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-mono tracking-wider text-saffron-secondary hover:text-red-400 transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto w-full max-w-7xl">
        <Routes>
          <Route path="/"        element={<Dashboard />} />
          <Route path="/books"   element={<BooksManager />} />
          <Route path="/content" element={<ContentEditor />} />
          <Route path="/awards"  element={<AwardsManager />} />
        </Routes>
      </main>
    </div>
  );
}

function NavLink({ to, current, children }) {
  return (
    <Link
      to={to}
      className={`px-4 py-3 rounded text-sm font-mono uppercase tracking-widest transition-colors ${
        current
          ? 'bg-saffron-primary/10 text-saffron-primary border-l-2 border-saffron-primary'
          : 'text-saffron-text/70 hover:bg-saffron-surface hover:text-saffron-text border-l-2 border-transparent'
      }`}
    >
      {children}
    </Link>
  );
}
