import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';

export const SignupPage = () => {
  const signupUser = useAuthStore((s) => s.signupUser);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signupUser(form);
    navigate('/profile');
  };

  return (
    <form className="mx-auto max-w-md space-y-3 rounded bg-white p-6 shadow" onSubmit={submit}>
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <input className="w-full rounded border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full rounded border p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full rounded border p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full rounded bg-blue-600 p-2 text-white">Create account</button>
      <p className="text-sm">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>
    </form>
  );
};
