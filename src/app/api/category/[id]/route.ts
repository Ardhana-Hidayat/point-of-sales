import { CategorySchema } from "@/lib/form-schema";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Singleton pattern untuk PrismaClient
const prisma =  new PrismaClient();

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = CategorySchema.parse(body); // Validasi body menggunakan Zod

    const { id } = context.params;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "Invalid ID. Must be a number." }, { status: 400 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parsedId },
      data: { name: data.name },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the category." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: parsedId },
    });

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ message: "Failed to delete category" }, { status: 500 });
  }
}