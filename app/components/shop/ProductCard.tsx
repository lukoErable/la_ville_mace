'use client';

import { ProductCardProps } from '@/app/types';
import Image from 'next/image';

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="flex flex-col h-full bg-green-50 rounded-lg overflow-hidden shadow-md border border-green-200 transition-all duration-300 hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-lg text-green-700">{product.name}</h3>
        <p className="text-green-900 text-sm mt-1 flex-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-green-800">
            {product.price.toFixed(2)} €
          </span>
          <button
            onClick={onAddToCart}
            className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-full text-sm transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
