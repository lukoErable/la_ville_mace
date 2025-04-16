/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Assure-toi que tu utilises ton prisma correctement

export async function POST(req: Request) {
  try {
    const { email, password, name, isAdmin = false } = await req.json();

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur avec isAdmin
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin, // Vous pouvez définir ici si l'utilisateur est admin
      },
    });

    return NextResponse.json(
      { message: 'Inscription réussie !' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
