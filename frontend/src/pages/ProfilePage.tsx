import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../api/userApi';
import { useAuthStore } from '../state/authStore';

export const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  const initialize = useAuthStore((s) => s.initialize);
  const navigate = useNavigate();
  const [role, setRole] = useState(user?.role || '');
  const [goal, setGoal] = useState(user?.goal || '');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ role, goal });
    await initialize();
    navigate('/onboarding');
  };

  return (
    <form className="mx-auto max-w-md space-y-3 rounded bg-white p-6 shadow" onSubmit={submit}>
      <h1 className="text-2xl font-semibold">Profile setup</h1>
      <p className="text-sm text-slate-600">We use this to assign your onboarding segment.</p>
      <input className="w-full rounded border p-2" placeholder="Your role (e.g., Founder)" value={role} onChange={(e) => setRole(e.target.value)} />
      <input className="w-full rounded border p-2" placeholder="Your goal (e.g., Launch MVP)" value={goal} onChange={(e) => setGoal(e.target.value)} />
      <button className="w-full rounded bg-blue-600 p-2 text-white">Continue</button>
    </form>
  );
};
