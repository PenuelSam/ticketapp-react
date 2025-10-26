import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../features/auth/useAuth';
import { FiMenu, FiX, FiUser } from 'react-icons/fi'; 

export default function Nav() {
  const { logout, isAuthenticated, getSession } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const authed = isAuthenticated();
  const user = authed ? getSession() : null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="nav">
      <nav className="navbar" aria-label="Primary navigation">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">
            TicketFlow
          </Link>

          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {authed ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/tickets"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={() => setMenuOpen(false)}
              >
                Tickets
              </NavLink>

              {/* User Icon instead of email */}
              <div className="nav-user">
                <FiUser size={20} />
              </div>

              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="button button-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
