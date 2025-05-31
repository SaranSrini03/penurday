import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  await connectToDatabase();

  const cookieStore = cookies();
  const email = (await cookieStore).get('userEmail')?.value;

  if (!email) {
    return NextResponse.json({ user: null });
  }

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: {
    username: user.username,
    name: user.name,
    email: user.email,
    dob: user.dob,
    terms: user.terms,
    createdAt: user.createdAt,
  } });
}
