import "server-only";
import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

const COLLECTION = "enquiries";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  createdAt: string;
  read: boolean;
};

async function col() {
  const client = await clientPromise;
  return client.db().collection(COLLECTION);
}

export async function saveEnquiry(data: {
  name: string;
  email: string;
  interest: string;
  message: string;
}): Promise<string> {
  const c = await col();
  const res = await c.insertOne({
    ...data,
    createdAt: new Date().toISOString(),
    read: false,
  });
  return res.insertedId.toString();
}

export async function listEnquiries(): Promise<Enquiry[]> {
  const c = await col();
  const docs = await c.find({}).sort({ createdAt: -1 }).limit(500).toArray();
  return docs.map((d) => ({
    id: d._id.toString(),
    name: d.name ?? "",
    email: d.email ?? "",
    interest: d.interest ?? "",
    message: d.message ?? "",
    createdAt: d.createdAt ?? "",
    read: !!d.read,
  }));
}

export async function setEnquiryRead(id: string, read: boolean): Promise<void> {
  let _id: ObjectId;
  try {
    _id = new ObjectId(id);
  } catch {
    return;
  }
  const c = await col();
  await c.updateOne({ _id }, { $set: { read } });
}

export async function deleteEnquiry(id: string): Promise<void> {
  let _id: ObjectId;
  try {
    _id = new ObjectId(id);
  } catch {
    return;
  }
  const c = await col();
  await c.deleteOne({ _id });
}
