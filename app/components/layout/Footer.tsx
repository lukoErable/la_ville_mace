'use client';

import Link from 'next/link';
import { categories } from '../../lib/data';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">La Ville Macé</h2>
            <p className="text-green-300 max-w-xs">
              {`Découvrez une sélection authentique de produits issus de
                l'agriculture durable.`}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-green-300">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/boutique"
                    className="hover:text-white transition-colors"
                  >
                    Boutique
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Catégories</h3>
              <ul className="space-y-2 text-green-300">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors capitalize"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-green-300">
                <li>contact@lavillemace.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>12 Chemin des Vergers, 75000 Paris</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-green-700 text-center text-green-400">
          <p>
            &copy; {new Date().getFullYear()} La ville mace. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
