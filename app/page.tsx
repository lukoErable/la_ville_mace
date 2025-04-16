import Image from 'next/image';
import Link from 'next/link';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { categories, products } from './lib/data';

export default function Home() {
  // Sélectionner quelques produits en vedette
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="bg-green-50">
      <Header />

      {/* Hero section */}
      <section className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-600 opacity-90" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue à la Ville Macé
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Des produits authentiques, cultivés avec passion et respect de la
            nature.
          </p>
          <Link
            href="/boutique"
            className="bg-green-50 text-green-900 hover:bg-green-100 px-8 py-3 rounded-full font-semibold transition-colors shadow-md"
          >
            Découvrir la boutique
          </Link>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-green-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
            Nos Catégories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative h-32 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              >
                <div className="absolute inset-0 bg-green-800 opacity-70 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-xl capitalize">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits en vedette */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-green-900">Nos Produits</h2>
            <Link
              href="/boutique"
              className="text-green-700 hover:underline font-medium"
            >
              Voir tous →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-xl text-green-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-green-700 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-800">
                      {product.price.toFixed(2)} €
                    </span>
                    <button className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-full text-sm transition-colors shadow">
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-green-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
            Pourquoi nous choisir ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-green-800 text-4xl mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">
                Qualité Naturelle
              </h3>
              <p className="text-green-700">
                Des produits cultivés dans le respect de la terre et de la
                biodiversité.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-green-800 text-4xl mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">
                Fraîcheur Locale
              </h3>
              <p className="text-green-700">
                Des produits livrés rapidement pour préserver toute leur
                fraîcheur.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-green-800 text-4xl mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">
                Service de Proximité
              </h3>
              <p className="text-green-700">
                Une équipe dévouée pour vous accompagner et répondre à toutes
                vos attentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
