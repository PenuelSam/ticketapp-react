import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Nav from '../../components/Nav';
import { useAuth } from './useAuth';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@ticketflow.app');
  const [password, setPassword] = useState('demo123');
  const [confirmPassword, setConfirmPassword] = useState('demo123');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    if (!password.trim()) nextErrors.password = 'Password is required.';
    if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (signup(email, password)) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="layout">
      <Nav />
      <main className="layout-main" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
        <div className="container" style={{ maxWidth: 520 }}>
          <Card>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Create your workspace</h1>
            <p style={{ color: 'var(--text-muted)' }}>Sign up to start tracking support tickets.</p>
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
              placeholder="Create a password"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>
          <Button type="submit" variant="primary" fullWidth>
            Create account
          </Button>
        </form>
        <p style={{ color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/auth/login">Log in</Link>
        </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
