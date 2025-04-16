import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

interface Params {
  folder: string;
  timestamp: number;
}

interface CloudinaryUploadResult {
  secure_url: string;
  url: string;
  public_id: string;
}

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log('Configuration Cloudinary:');
  console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('API Key:', process.env.CLOUDINARY_API_KEY?.slice(0, 4) + '****');
};

const generateSignature = (params: Params, apiSecret: string): string => {
  const stringToSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key as keyof Params]}`)
    .join('&');

  const signature = crypto
    .createHmac('sha1', apiSecret)
    .update(stringToSign)
    .digest('hex');

  return signature;
};

export const uploadImageToCloudinary = async (
  imageBuffer: Buffer
): Promise<CloudinaryUploadResult> => {
  configureCloudinary();

  const timestamp = Math.floor(Date.now() / 1000);
  const params: Params = {
    folder: 'products',
    timestamp,
  };

  const signature = generateSignature(
    params,
    process.env.CLOUDINARY_API_SECRET as string
  );

  const uploadOptions = {
    ...params,
    signature,
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result as CloudinaryUploadResult);
      }
    );

    uploadStream.end(imageBuffer);
  });
};
