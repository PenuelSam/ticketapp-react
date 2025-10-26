import { FormEvent, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Nav from '../../components/Nav';
import { useAuth } from './useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('demo@ticketflow.app');
  const [password, setPassword] = useState('demo123');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    if (!password.trim()) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (login(email, password)) {
      const state = location.state as { from?: { pathname?: string } } | null;
      const redirectTo = state?.from?.pathname ?? '/dashboard';
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <div className="layout">
      <Nav />
      <main className="layout-main" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
        <div className="container" style={{ maxWidth: 520 }}>
          <Card>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Welcome back</h1>
            <p style={{ color: 'var(--text-muted)' }}>Log in to continue managing your tickets.</p>
            <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          <Button type="submit" variant="primary" fullWidth>
            Log In
          </Button>
        </form>
        <p style={{ color: 'var(--text-muted)' }}>
          Need an account? <Link to="/auth/signup">Sign up</Link>
        </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
