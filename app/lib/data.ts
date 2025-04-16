import { Category, Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'T-shirt Premium',
    description: 'T-shirt en coton bio avec design exclusif',
    price: 29.99,
    image: '/images/products/product1.jpg',
    category: 'Graines',
  },
  {
    id: 2,
    name: 'Casquette Urban',
    description: 'Casquette style urbain ajustable',
    price: 19.99,
    image: '/images/products/product2.jpg',
    category: 'Graines',
  },
  {
    id: 3,
    name: 'Sneakers Classic',
    description: 'Sneakers confortables pour usage quotidien',
    price: 89.99,
    image: '/images/products/product3.jpg',
    category: 'Graines',
  },
  {
    id: 4,
    name: 'Sweat à capuche',
    description: 'Sweat-shirt chaud avec capuche réglable',
    price: 49.99,
    image: '/images/products/product4.jpg',
    category: 'Graines',
  },
  {
    id: 5,
    name: 'Sac à dos voyage',
    description: 'Sac à dos imperméable avec nombreux compartiments',
    price: 59.99,
    image: '/images/products/product5.jpg',
    category: 'Graines',
  },
  {
    id: 6,
    name: 'Montre connectée',
    description: "Montre intelligente avec suivi d'activité",
    price: 129.99,
    image: '/images/products/product6.jpg',
    category: 'Graines',
  },
];

export const categories: Category[] = [
  { id: 1, name: '🌿 Fruits et Légumes' },
  { id: 2, name: '🥖 Produits' },
  { id: 3, name: '🧀 Produits Laitiers' },
  { id: 4, name: '🥩 Viandes et Œufs' },
  { id: 5, name: '🍯 Miel et Produits' },
  { id: 6, name: '🌱 Plantes et Tisane' },
  { id: 7, name: '🌼 Graines' },
];
