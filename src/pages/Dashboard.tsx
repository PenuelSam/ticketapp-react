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
        <div className="container">
          <section className="dashboard-header">
            <h1 className="dashboard-title">
              Welcome back{session ? `, ${session.user.email}` : ''}!
            </h1>
            <p className="dashboard-text">
              View the health of your support pipeline at a glance. Stay ahead of the queue and keep
              your customers delighted.
            </p>
            <div className="dashboard-actions">
              <Button as={Link} to="/tickets" variant="primary">
                Manage tickets
              </Button>
              <Button as={Link} to="/tickets" variant="secondary">
                View all tickets
              </Button>
            </div>
          </section>

          <section className="card-grid">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <span className="metric-label">{metric.label}</span>
                <div className="metric-value">{metric.value}</div>
                <p className="metric-description">{metric.description}</p>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
