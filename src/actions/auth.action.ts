"use server";

import { getJwtSecretKey, TOKEN_NAME } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { username: true, password: true, id: true },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: "Invalid password" };
    }

    const token = await new SignJWT({
      sub: user.id,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d") // expires in 7 days
      .sign(getJwtSecretKey());

    (await cookies()).set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, token, userId: user.id };
  } catch (error) {
    console.error("Error signing in:", error);
    return { success: false, error: "An error occurred while signing in." };
  }
}

export async function signOut() {
  (await cookies()).delete(TOKEN_NAME);
}
