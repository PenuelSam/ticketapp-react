import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';

const SESSION_KEY = 'ticketapp_session';
const SESSION_DURATION = 1000 * 60 * 60 * 8; // 8 hours

type Session = {
  token: string;
  user: {
    email: string;
  };
  exp: number;
};

type AuthResult = {
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
  getSession: () => Session | null;
};

function createSession(email: string): Session {
  return {
    token: crypto.randomUUID(),
    user: { email },
    exp: Date.now() + SESSION_DURATION
  };
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Session;
    if (!data.exp || data.exp < Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unable to parse session', error);
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function useAuth(): AuthResult {
  const login = useCallback((email: string, password: string) => {
    if (!email?.trim() || !password?.trim()) {
      toast.error('Email and password are required.');
      return false;
    }
    if (!email.includes('@')) {
      toast.error('Enter a valid email address.');
      return false;
    }
    const session = createSession(email.toLowerCase());
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    toast.success('Welcome back!');
    return true;
  }, []);

  const signup = useCallback((email: string, password: string) => {
    if (!email?.trim() || !password?.trim()) {
      toast.error('Email and password are required.');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return false;
    }
    const session = createSession(email.toLowerCase());
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    toast.success('Account created successfully!');
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    toast.success('Signed out');
  }, []);

  const value = useMemo(
    () => ({
      login,
      signup,
      logout,
      isAuthenticated,
      getSession
    }),
    [login, signup, logout]
  );

  return value;
}
