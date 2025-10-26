import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Nav from '../../components/Nav';
import TicketForm from './TicketForm';
import { useTickets, type TicketInput } from './store';
import { toast } from 'sonner';

export default function TicketList() {
  const { tickets, create, remove } = useTickets();
  const [creating, setCreating] = useState(false);

  const handleCreate = (values: TicketInput) => {
    try {
      create(values);
      toast.success('Ticket created successfully.');
      setCreating(false);
    } catch (error) {
      if (error && typeof error === 'object') {
        toast.error('Please review the form fields.');
      }
    }
  };

  return (
    <div className="layout">
      <Nav />
      <main className="layout-main">
        <div className="container">
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}
          >
            <div>
              <h1 style={{ marginBottom: '0.25rem' }}>Tickets</h1>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Track and update the progress of every request.</p>
            </div>
            <Button variant="primary" onClick={() => setCreating((prev) => !prev)}>
              {creating ? 'Close' : 'New Ticket'}
            </Button>
          </div>

          {creating && (
            <Card style={{ marginBottom: '2rem' }}>
              <TicketForm onSubmit={handleCreate} onCancel={() => setCreating(false)} submitLabel="Create ticket" />
            </Card>
          )}

          {tickets.length === 0 ? (
            <Card className="table-empty">No tickets yet. Create your first ticket to get started.</Card>
          ) : (
            <div className="ticket-grid">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}
                  >
                    <div>
                      <Badge status={ticket.status} />
                      <h2 style={{ marginBottom: '0.5rem' }}>{ticket.title}</h2>
                      <p style={{ color: 'var(--text-muted)' }}>{ticket.description || 'No description provided.'}</p>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 120 }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Priority</span>
                      <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{ticket.priority}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '1.5rem',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Updated {new Date(ticket.updatedAt).toLocaleString()}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button as={Link} to={`/tickets/${ticket.id}`} variant="secondary">
                        Edit
                      </Button>
                      <Button variant="ghost" onClick={() => remove(ticket.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
