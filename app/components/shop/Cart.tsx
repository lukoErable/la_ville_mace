'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CartItem } from '../../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export default function Cart({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
}: CartProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {isVisible && (
        // Le panneau du panier
        <div
          className={`fixed right-0 top-0 h-full bg-green-50 w-full max-w-md z-50 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } shadow-xl`}
        >
          <div className="p-4 border-b sticky top-0 bg-green-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-green-800 flex items-center">
              Votre panier de la ferme
            </h2>
            <button
              onClick={onClose}
              className="text-green-800 hover:text-green-600"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="p-6 text-center text-green-800 bg-green-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
                <circle cx="12" cy="15" r="1" fill="currentColor" />
              </svg>
              Votre panier est vide comme un champ après la récolte
            </div>
          ) : (
            <>
              <ul
                className="divide-y divide-green-200 overflow-y-auto"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
              >
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 flex items-center bg-white hover:bg-green-50 transition-colors"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                      />
                    </div>

                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-green-900">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-green-700">
                          {item.price.toFixed(2)} € x {item.quantity}
                        </div>
                        <div className="flex items-center border border-green-300 rounded-full">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-green-700 hover:bg-green-100 rounded-l-full disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-green-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-green-700 hover:bg-green-100 rounded-r-full"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 text-right">
                      <div className="font-semibold text-green-900">
                        {(item.price * item.quantity).toFixed(2)} €
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="mt-1 text-sm text-red-600 hover:text-red-800"
                      >
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-green-200 p-4 bg-green-100 sticky bottom-0">
                <div className="flex justify-between mb-4">
                  <span className="font-medium text-green-900">Total</span>
                  <span className="font-semibold text-green-900">
                    {cartTotal.toFixed(2)} €
                  </span>
                </div>

                <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Passer la commande
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
