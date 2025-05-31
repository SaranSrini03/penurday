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

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    const userResponse = {
      username: user.username,
      name: user.name,
      email: user.email,
      dob: user.dob,
      createdAt: user.createdAt,
    };

    const response = NextResponse.json({ success: true, user: userResponse });

    // Set cookie named "userEmail"
    response.cookies.set({
      name: "userEmail",
      value: user.email,
      path: "/",              // accessible site-wide
      maxAge: 60 * 60 * 24 * 7,  // 7 days
      httpOnly: false,         // so you can access it in frontend if needed
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
