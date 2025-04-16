import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, category, image } = body;

    // Validation des données
    if (!name || !description || !price || !category || !image) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Création du produit dans la base de données
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        category,
        image,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    return NextResponse.json(
      {
        error: 'Erreur lors de la création du produit',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    );
  }
}
