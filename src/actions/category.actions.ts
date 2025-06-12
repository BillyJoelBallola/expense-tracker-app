"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "./user.action";
import { Category } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    const user = await currentUser();

    if (!user) return;

    const categories = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
    });

    return categories ?? [];
  } catch (error) {
    console.error("Failed to fetch categories");
    throw new Error("Failed to fetch categories");
  }
}

export async function getCategoryTransfer() {
  try {
    const user = await currentUser();

    if (!user) return;

    const category = await prisma.category.findFirst({
      where: {
        type: "TRANSFER",
      },
    });

    return category;
  } catch (error) {
    console.error("Failed to fetch category");
    throw new Error("Failed to fetch category");
  }
}

export async function createCategory({
  type,
  label,
}: {
  type: Category["type"];
  label: string;
}) {
  try {
    const user = await currentUser();

    if (!user) return;

    const isExisting = await prisma.category.findFirst({
      where: {
        label,
        userId: user.id,
      },
    });

    if (isExisting) return { error: "Category already existing" };

    const category = await prisma.category.create({
      data: {
        userId: user.id,
        label,
        type,
      },
    });

    revalidatePath("/");
    return { success: true, category };
  } catch (error) {
    console.error("Failed to create new category");
    return { error: "Failed to create new category" };
  }
}

export async function removeCategory(categoryId: string) {
  try {
    const user = await currentUser();

    if (!user) return;

    if (!categoryId) return;

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to remove category");
    return { error: "Failed to remove category" };
  }
}
