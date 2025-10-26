export function validateTicket(input: any) {
  const errors: Record<string, string> = {};
  if (!input.title?.trim()) errors.title = 'Title is required.';
  if (!['open', 'in_progress', 'closed'].includes(input.status))
    errors.status = 'Status must be open, in_progress, or closed.';
  if (input.description?.length > 1000)
    errors.description = 'Description too long (max 1000 chars).';
  return errors;
}
