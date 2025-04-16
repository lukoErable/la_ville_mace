import { NextResponse } from 'next/server';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('file') as File;

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { error: 'Fichier manquant ou incorrect' },
        { status: 400 }
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Téléchargement de l'image vers Cloudinary
    const result = await uploadImageToCloudinary(buffer);

    // Retourner une réponse avec les données de Cloudinary (URL, etc.)
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur de téléchargement d'image:", error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
