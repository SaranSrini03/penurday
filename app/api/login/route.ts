// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { usernameOrEmail, password } = data;

    if (!usernameOrEmail?.trim() || !password) {
      return NextResponse.json(
        { success: false, error: "Username/email and password are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    // TODO: Here you can create a session or JWT token and return it to the client.
    // For now, just return success and user data (excluding password).

    const userResponse = {
      username: user.username,
      name: user.name,
      email: user.email,
      dob: user.dob,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ success: true, user: userResponse });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
