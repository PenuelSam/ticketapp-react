import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTickets } from '../features/tickets/store';
import { getSession } from '../features/auth/useAuth';

export default function Dashboard() {
  const { tickets } = useTickets();
  const session = getSession();

  const metrics = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((ticket) => ticket.status === 'open').length;
    const resolved = tickets.filter((ticket) => ticket.status === 'closed').length;
    return [
      {
        label: 'Total tickets',
        value: total,
        description: 'All requests currently tracked in the workspace.'
      },
      {
        label: 'Open',
        value: open,
        description: 'Tickets awaiting an initial response or action.'
      },
      {
        label: 'Resolved',
        value: resolved,
        description: 'Tickets marked as closed by the team.'
      }
    ];
  }, [tickets]);

  return (
    <div className="layout">
      <Nav />
      <main className="layout-main">
        <div className="container card-grid" style={{ gap: '2rem' }}>
          <section>
            <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Welcome back{session ? `, ${session.user.email}` : ''}!</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: 640 }}>
              View the health of your support pipeline at a glance. Stay ahead of the queue and keep your
              customers delighted.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Button as={Link} to="/tickets" variant="primary">
                Manage tickets
              </Button>
              <Button as={Link} to="/tickets" variant="secondary">
                View all tickets
              </Button>
            </div>
          </section>
          <section className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <span style={{ fontSize: '0.9rem', color: 'var(--brand)', fontWeight: 600 }}>{metric.label}</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0' }}>{metric.value}</div>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>{metric.description}</p>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
