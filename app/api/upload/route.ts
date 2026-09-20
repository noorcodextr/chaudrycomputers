import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const files = formData.getAll("files");

    if (!files.length) {
      return NextResponse.json(
        { error: "No image files provided" },
        { status: 400 }
      );
    }

    const imageFiles = files.filter(
      (file): file is File =>
        file instanceof File && file.type.startsWith("image/")
    );

    if (!imageFiles.length) {
      return NextResponse.json(
        { error: "No valid image files provided" },
        { status: 400 }
      );
    }

    const uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise<{
          url: string;
          publicId: string;
        }>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "chaudry-computers/products",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }

              if (!result) {
                reject(
                  new Error("Cloudinary returned no result")
                );
                return;
              }

              resolve({
                url: result.secure_url,
                publicId: result.public_id,
              });
            }
          );

          uploadStream.end(buffer);
        });
      })
    );

    return NextResponse.json({
      success: true,
      images: uploadedImages,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      { error: "Image upload failed" },
      { status: 500 }
    );
  }
}