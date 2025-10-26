import { NavLink, Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../features/auth/useAuth';

export default function Nav() {
  const { logout, isAuthenticated, getSession } = useAuth();
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const user = authed ? getSession() : null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="container">
      <nav className="navbar" aria-label="Primary navigation">
        <Link to="/" style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--brand)' }}>
          TicketFlow
        </Link>
        <div className="nav-links">
          {authed ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Dashboard
              </NavLink>
              <NavLink to="/tickets" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                Tickets
              </NavLink>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{user?.user.email}</span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth/login" className="button button-secondary">
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
