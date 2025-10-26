import { createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Dashboard from './pages/Dashboard';
import TicketList from './features/tickets/TicketList';
import TicketPage from './features/tickets/TicketPage';
import ProtectedRoute from './features/auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/auth',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/tickets', element: <TicketList /> },
      { path: '/tickets/:id', element: <TicketPage /> }
    ]
  }
]);

export default router;
