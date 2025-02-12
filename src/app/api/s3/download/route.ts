import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// AWS S3 설정
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const BUCKET_NAME = "dlmm";
  const FILE_NAME = "pix2pix"; 

  try {
    // Presigned URL 생성
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: FILE_NAME,
      ResponseContentType: "application/octet-stream",
      ResponseContentDisposition: "attachment",
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Presigned URL 생성 오류:", error);
    return NextResponse.json({ error: "Failed to generate download URL" }, { status: 500 });
  }
}
