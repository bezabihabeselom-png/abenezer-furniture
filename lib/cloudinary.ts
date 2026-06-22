import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(base64: string): Promise<string> {
  const result = await cloudinary.uploader.upload(base64, {
    folder: "abenezer-furniture",
    resource_type: "image",
    transformation: [{ width: 1600, crop: "limit" }, { quality: "auto" }],
  });
  return result.secure_url;
}

export default cloudinary;
