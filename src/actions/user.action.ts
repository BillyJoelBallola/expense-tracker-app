"use server";

import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { getJwtSecretKey, TOKEN_NAME } from "@/lib/auth";

export async function currentUser() {
  try {
    const token = (await cookies()).get(TOKEN_NAME)?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(token, getJwtSecretKey());

    if (!payload.sub || typeof payload.username !== "string") return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        password: true,
      },
    });

    return user;
  } catch (error) {
    console.error("currentUser() error:", error);
    return null;
  }
}

export async function updateProfile({
  username,
  firstName,
  lastName,
}: {
  username: string;
  firstName: string;
  lastName: string;
}) {
  try {
    const user = await currentUser();

    if (!user) return;

    if (
      user.username === username &&
      user.firstName === firstName &&
      user.lastName === lastName
    ) {
      return { error: "There are no changes in profile information" };
    }

    const result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: username,
        firstName: firstName,
        lastName: lastName,
      },
    });

    revalidatePath("/");
    return { success: true, result };
  } catch (error) {
    console.error("updateProfile() error:", error);
    return { error: "Failed to update profile information" };
  }
}

export async function updateAccount({
  currentPassword,
  newPassword,
  confirmPassword,
}: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  try {
    const user = await currentUser();

    if (!user) return;

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return { error: "Incorrect current password" };
    }

    if (newPassword.length < 8) {
      return { error: "New password must be 8 characters or more" };
    }

    if (newPassword !== confirmPassword) {
      return { error: "Incorrect confirm password" };
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(confirmPassword, saltRounds);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { success: true, updatedUser };
  } catch (error) {
    console.error("updateAccount() error:", error);
    return { error: "Failed to update profile information" };
  }
}
