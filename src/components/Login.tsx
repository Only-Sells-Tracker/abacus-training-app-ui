import { useState } from 'react';
// @ts-ignore: Allow importing image asset without type declaration
import logo from '../asset/logo.png';

export interface LoginResponse {
  token: string;
  email: string;
}

export default function Login({ onLogin }: { onLogin: (user: LoginResponse) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://abacus-demo.free.beeceptor.com/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      // const data = await res.json();
      const data = { token: 'demo-token', email }; // Mocked response
      if (data.token) {
        onLogin(data);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col gap-6 border border-white/10 mx-auto"
      >
        <img src={logo} alt="Abacus Training Logo" className="w-32 h-32 mx-auto" />
        <h2 className="text-3xl font-bold text-white text-center mb-1 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Welcome back!
        </h2>
        <p className="text-center text-gray-400 mb-4 text-base">
          Sign in to continue your abacus journey
        </p>
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="rounded-xl px-4 py-2 bg-white/20 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="rounded-xl px-4 py-2 bg-white/20 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <div className="text-red-400 text-sm text-center font-medium">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-2 rounded-xl shadow hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-60 text-lg tracking-wide mt-2"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
