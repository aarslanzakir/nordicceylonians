import "server-only";
import { GridFSBucket, ObjectId } from "mongodb";
import clientPromise from "./mongodb";

async function getBucket() {
  const client = await clientPromise;
  return new GridFSBucket(client.db(), { bucketName: "images" });
}

export async function uploadImage(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const bucket = await getBucket();
  return new Promise((resolve, reject) => {
    const stream = bucket.openUploadStream(filename, {
      metadata: { contentType },
    });
    stream.on("error", reject);
    stream.on("finish", () => resolve(stream.id.toString()));
    stream.end(buffer);
  });
}

export async function getImage(
  id: string
): Promise<{ buffer: Buffer; contentType: string } | null> {
  let _id: ObjectId;
  try {
    _id = new ObjectId(id);
  } catch {
    return null;
  }
  const bucket = await getBucket();
  const files = await bucket.find({ _id }).toArray();
  if (!files.length) return null;
  const contentType =
    (files[0].metadata?.contentType as string) || "application/octet-stream";
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    const stream = bucket.openDownloadStream(_id);
    stream.on("data", (c: Buffer) => chunks.push(c));
    stream.on("error", reject);
    stream.on("end", () => resolve({ buffer: Buffer.concat(chunks), contentType }));
  });
}
