import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Nav from '../../components/Nav';
import TicketForm from './TicketForm';
import { useTickets, type TicketInput } from './store';
import { toast } from 'sonner';

function formatUpdatedTime(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

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
          <div className="ticket-header">
            <div>
              <h1>Tickets</h1>
              <p>Track and update the progress of every request.</p>
            </div>
            <Button variant="primary" onClick={() => setCreating((prev) => !prev)}>
              {creating ? 'Close' : 'New Ticket'}
            </Button>
          </div>

          {/* Show Ticket Form when creating */}
          {creating ? (
            <Card className="ticket-form-card">
              <TicketForm
                onSubmit={handleCreate}
                onCancel={() => setCreating(false)}
                submitLabel="Create ticket"
              />
            </Card>
          ) : (
            // Show Ticket List when not creating
            <>
              {tickets.length === 0 ? (
                <Card className="table-empty">
                  No tickets yet. Create your first ticket to get started.
                </Card>
              ) : (
                <div className="ticket-grid">
                  {tickets.map((ticket) => (
                    <Card key={ticket.id} className="ticket-card">
                      <div className="ticket-top">
                        <div className="ticket-info">
                          <Badge status={ticket.status} />
                          <h2>{ticket.title}</h2>
                          <p>{ticket.description || 'No description provided.'}</p>
                        </div>
                        <div className="ticket-priority">
                          <span>Priority:</span>
                          <div>{ticket.priority}</div>
                        </div>
                      </div>

                      <div className="ticket-bottom">
                        <div className="ticket-updated">
                          Updated {formatUpdatedTime(ticket.updatedAt)}
                        </div>
                        <div className="ticket-actions">
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}
