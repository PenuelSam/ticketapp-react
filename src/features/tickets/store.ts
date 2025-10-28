import { create } from 'zustand';
import { validateTicket } from '../../lib/validate';
import { getItem, saveItem } from '../../lib/storage';

type TicketInput = {
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
};

type Ticket = TicketInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type TicketStore = {
  tickets: Ticket[];
  // eslint-disable-next-line no-unused-vars
  create: (input: TicketInput) => void;
  // eslint-disable-next-line no-unused-vars
  update: (id: string, input: TicketInput) => void;
  // eslint-disable-next-line no-unused-vars
  remove: (id: string) => void;
};

export const useTickets = create<TicketStore>((set, get) => ({
  tickets: getItem<Ticket[]>('tickets', []),
  create: (input: TicketInput) => {
    const errors = validateTicket(input);
    if (Object.keys(errors).length) throw errors;
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const list = [...get().tickets, newTicket];
    saveItem('tickets', list);
    set({ tickets: list });
  },
  update: (id: string, input: TicketInput) => {
    const errors = validateTicket(input);
    if (Object.keys(errors).length) throw errors;
    const list = get().tickets.map((t) =>
      t.id === id ? { ...t, ...input, updatedAt: new Date().toISOString() } : t
    );
    saveItem('tickets', list);
    set({ tickets: list });
  },
  remove: (id: string) => {
    if (!confirm('Delete this ticket?')) return;
    const list = get().tickets.filter((t) => t.id !== id);
    saveItem('tickets', list);
    set({ tickets: list });
  }
}));

export type { Ticket, TicketInput };
