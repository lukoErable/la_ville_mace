'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    setIsLoading(false);

    if (result?.error) {
      setError('Email ou mot de passe incorrect');
    } else {
      router.push('/'); // Redirection vers la page d'accueil après une connexion réussie
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white shadow-md rounded-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">Connexion</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          disabled={isLoading}
          className="block w-full mb-2 p-2 border rounded disabled:opacity-50"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          disabled={isLoading}
          className="block w-full mb-2 p-2 border rounded disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50"
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
