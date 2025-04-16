import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { error: 'Email ou mot de passe incorrect' },
      { status: 401 }
    );
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: '7d',
  });

  return NextResponse.json({ token });
}
