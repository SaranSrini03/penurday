// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { username, name, email, password, confirmPassword, dob, terms } = data;

    // Server-side validation
    if (
      !username?.trim() ||
      !name?.trim() ||
      !email?.trim() ||
      !dob ||
      !password ||
      password.length < 8 ||
      password !== confirmPassword ||
      !terms
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid input data" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Username or email already taken" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      name,
      email,
      password: hashedPassword,
      dob: new Date(dob),
      terms,
    });

    await user.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
