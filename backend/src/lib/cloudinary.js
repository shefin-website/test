import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

const hasValidCloudinaryConfig = 
  ENV.CLOUDINARY_CLOUD_NAME && 
  ENV.CLOUDINARY_CLOUD_NAME.trim() !== "" &&
  !ENV.CLOUDINARY_CLOUD_NAME.includes("your_cloudinary") &&
  ENV.CLOUDINARY_API_KEY && 
  ENV.CLOUDINARY_API_KEY.trim() !== "" &&
  !ENV.CLOUDINARY_API_KEY.includes("your_cloudinary") &&
  ENV.CLOUDINARY_API_SECRET && 
  ENV.CLOUDINARY_API_SECRET.trim() !== "" &&
  !ENV.CLOUDINARY_API_SECRET.includes("your_cloudinary");

if (hasValidCloudinaryConfig) {
  cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
  });
} else {
  if (ENV.NODE_ENV === "development") {
    console.warn(
      "Cloudinary credentials are not configured. Image uploads will be disabled in this environment."
    );
  }
}

export default cloudinary;
