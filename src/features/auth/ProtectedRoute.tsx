import { useEffect, useMemo, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { getSession } from './useAuth';

export default function ProtectedRoute() {
  const location = useLocation();
  const rawSession = useMemo(() => localStorage.getItem('ticketapp_session'), []);
  const session = getSession();
  const warnedRef = useRef(false);

  useEffect(() => {
    if (!session && !warnedRef.current) {
      if (rawSession) {
        localStorage.removeItem('ticketapp_session');
        toast.error('Your session has expired — please log in again.');
      }
      warnedRef.current = true;
    }
  }, [rawSession, session]);

  if (!session) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
