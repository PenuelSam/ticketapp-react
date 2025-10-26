import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Nav from '../../components/Nav';
import TicketForm from './TicketForm';
import { useTickets, type TicketInput } from './store';
import { toast } from 'sonner';

export default function TicketPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets, update } = useTickets();

  const ticket = useMemo(() => tickets.find((item) => item.id === id), [tickets, id]);

  const handleSubmit = (values: TicketInput) => {
    if (!id) return;
    try {
      update(id, values);
      toast.success('Ticket updated.');
      navigate('/tickets');
    } catch (error) {
      toast.error('Please check the form before saving.');
    }
  };

  if (!ticket) {
    return (
      <div className="layout">
        <Nav />
        <main className="layout-main">
          <div className="container" style={{ maxWidth: 720 }}>
            <Card>
              <h1>Ticket not found</h1>
              <p style={{ color: 'var(--text-muted)' }}>The ticket you are looking for may have been removed.</p>
              <Button variant="secondary" onClick={() => navigate('/tickets')}>
                Back to tickets
              </Button>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="layout">
      <Nav />
      <main className="layout-main">
        <div className="container" style={{ maxWidth: 720 }}>
          <Card>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
            >
              <div>
                <h1 style={{ margin: 0 }}>Edit ticket</h1>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                  Update the ticket details and save to keep everyone informed.
                </p>
              </div>
              <Button variant="ghost" onClick={() => navigate(-1)}>
                Close
              </Button>
            </div>
            <TicketForm ticket={ticket} onSubmit={handleSubmit} submitLabel="Save changes" />
          </Card>
        </div>
      </main>
    </div>
  );
}
