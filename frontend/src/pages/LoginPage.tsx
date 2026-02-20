import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';

export const LoginPage = () => {
  const loginUser = useAuthStore((s) => s.loginUser);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser(form);
    navigate('/');
  };

  return (
    <form className="mx-auto max-w-md space-y-3 rounded bg-white p-6 shadow" onSubmit={submit}>
      <h1 className="text-2xl font-semibold">Login</h1>
      <input className="w-full rounded border p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full rounded border p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full rounded bg-blue-600 p-2 text-white">Login</button>
      <p className="text-sm">New user? <Link className="text-blue-600" to="/signup">Sign up</Link></p>
    </form>
  );
};
