import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';

export const Layout = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <Link to="/" className="font-bold">VANITY Engine</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.email}</span>
              <button className="rounded bg-slate-800 px-3 py-1 text-white" onClick={logout}>Logout</button>
            </div>
          ) : null}
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-4">
        <Outlet />
      </main>
    </div>
  );
};
