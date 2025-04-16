'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  onCartClick?: () => void;
  cartItemCount?: number;
}

export default function Header({
  onCartClick,
  cartItemCount = 0,
}: HeaderProps) {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-green-200 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-2xl text-green-900 flex items-center"
        >
          <Image
            alt=""
            width={64}
            height={64}
            src={
              'https://w1.pngwing.com/pngs/817/701/png-transparent-green-leaf-logo-agriculture-accommodation-internet-television-2018-hotel-farm-stay.png'
            }
          />
          LA VILLE MACE
        </Link>

        <nav
          className={`absolute md:relative top-full left-0 w-full md:w-auto bg-green-200 md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none transition-transform duration-300 transform ${
            isMobileMenuOpen
              ? 'translate-y-0'
              : '-translate-y-full md:translate-y-0'
          } z-30 md:flex md:space-x-8`}
        >
          <Link
            href="/"
            className="block py-2 md:py-0 font-medium text-green-900 hover:text-green-700 transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/boutique"
            className="block py-2 md:py-0 font-medium text-green-900 hover:text-green-700 transition-colors"
          >
            Boutique
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={onCartClick}
            className="relative p-2 text-green-900 hover:text-green-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {status === 'loading' ? (
            <div>Chargement...</div>
          ) : session ? (
            <div className="flex items-center space-x-4">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                  {session.user?.name?.[0].toUpperCase()}
                </div>
              )}
              <span className="text-green-900">{session.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
            >
              Connexion
            </Link>
          )}

          <button
            className="md:hidden text-green-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
