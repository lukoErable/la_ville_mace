'use client';

import { useRef, useState } from 'react';
import Header from '../components/layout/Header';
import Cart from '../components/shop/Cart';
import ProductCard from '../components/shop/ProductCard';
import FlyToCartAnimation from '../components/ui/FlyToCartAnimation';
import { categories, products } from '../lib/data';
import { Product } from '../types';

interface AnimationData {
  imageSrc: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [animationData, setAnimationData] = useState<AnimationData | null>(
    null
  );
  const cartIconRef = useRef<HTMLButtonElement>(null);

  // Filtrer les produits par catégorie
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Fonction d'ajout au panier et déclenchement de l'animation
  const addToCart = (
    product: Product,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const start = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const cartRect: DOMRect | undefined =
      cartIconRef.current?.getBoundingClientRect();
    const end = cartRect
      ? {
          x: cartRect.left + cartRect.width / 2,
          y: cartRect.top + cartRect.height / 2,
        }
      : { x: 0, y: 0 };

    setAnimationData({ imageSrc: product.image, start, end });

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (productId: number, quantity: number) => {
    setCart(
      cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  return (
    <main className="bg-green-50 min-h-screen">
      {/* Transmission des props pour ouvrir le panier et mettre à jour le compteur */}
      <Header
        onCartClick={() => setShowCart(true)}
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
      />

      {/* En-tête de la boutique */}
      <section className="bg-green-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2 text-green-900">
            Notre boutique
          </h1>
          <p className="text-green-800">
            Découvrez tous nos produits de qualité pour une ferme en
            permaculture
          </p>
        </div>
      </section>

      <div className="mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres et catégories */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-26 bg-green-200 rounded-lg shadow-lg p-6">
              <h2 className="font-semibold text-lg mb-4 text-green-900">
                Catégories
              </h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left py-1 px-2 rounded ${
                      selectedCategory === 'all'
                        ? 'bg-green-300 text-green-800'
                        : 'hover:bg-green-300 text-green-500'
                    }`}
                  >
                    Tous les produits
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left py-1 px-2 rounded capitalize ${
                        selectedCategory === category.name
                          ? 'bg-green-300 text-green-800'
                          : 'hover:bg-green-300 text-green-500'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Liste des produits */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold capitalize text-green-900">
                {selectedCategory === 'all'
                  ? 'Tous les produits'
                  : selectedCategory}
              </h2>
              <span className="text-green-800">
                {filteredProducts.length} produits
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(e) => addToCart(product, e)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation FlyToCart */}
      {animationData && (
        <FlyToCartAnimation
          imageSrc={animationData.imageSrc}
          start={animationData.start}
          end={animationData.end}
          onAnimationComplete={() => setAnimationData(null)}
        />
      )}

      {/* Panier en overlay (affichage en panel latéral sans overlay global) */}
      {showCart && (
        <Cart
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          items={cart}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}

      {/* Bouton panier flottant */}
      <button
        ref={cartIconRef}
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors z-10"
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
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </button>
    </main>
  );
}
