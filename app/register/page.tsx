'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Connexion immédiate après l'inscription
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (result?.error) {
        setError('Erreur de connexion après inscription');
      } else {
        router.push('/'); // Redirection vers la page d'accueil
      }
    } else {
      setError('Échec de l’inscription');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleRegister}
        className="p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-xl font-bold mb-4">Inscription</h2>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Nom"
          required
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          Sinscrire
        </button>
      </form>
    </div>
  );
}
