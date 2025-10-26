import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../../components/Button';
import { validateTicket } from '../../lib/validate';
import type { Ticket, TicketInput } from './store';
import { toast } from 'sonner';

type TicketFormProps = {
  ticket?: Ticket;
  onSubmit: (values: TicketInput) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

const statusOptions: TicketInput['status'][] = ['open', 'in_progress', 'closed'];
const priorityOptions: TicketInput['priority'][] = ['low', 'medium', 'high'];

export default function TicketForm({ ticket, onSubmit, onCancel, submitLabel }: TicketFormProps) {
  const [values, setValues] = useState<TicketInput>({
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    status: ticket?.status ?? 'open',
    priority: ticket?.priority ?? 'medium'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setValues({
      title: ticket?.title ?? '',
      description: ticket?.description ?? '',
      status: ticket?.status ?? 'open',
      priority: ticket?.priority ?? 'medium'
    });
  }, [ticket]);

  const handleChange = (field: keyof TicketInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [field]: event.target.value } as TicketInput;
      setValues(next);
      setErrors(validateTicket(next));
    };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateTicket(values);
    setErrors(validation);
    if (Object.keys(validation).length) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    try {
      onSubmit(values);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={values.title}
          onChange={handleChange('title')}
          placeholder="Brief ticket summary"
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={values.description}
          onChange={handleChange('description')}
          placeholder="Describe the issue or request"
        />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </div>
      <div className="field">
        <label htmlFor="status">Status</label>
        <select id="status" value={values.status} onChange={handleChange('status')}>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option.replace('_', ' ')}
            </option>
          ))}
        </select>
        {errors.status && <span className="field-error">{errors.status}</span>}
      </div>
      <div className="field">
        <label htmlFor="priority">Priority</label>
        <select id="priority" value={values.priority} onChange={handleChange('priority')}>
          {priorityOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {submitLabel ?? (ticket ? 'Save changes' : 'Create ticket')}
        </Button>
      </div>
    </form>
  );
}
