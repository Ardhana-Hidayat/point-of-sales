// /app/api/category/[id]/route.ts atau /pages/api/category/[id].ts

import { CategorySchema } from "@/lib/form-schema";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = CategorySchema.parse(body); 

    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name: data.name },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    } else if (error) {
      console.error("Prisma error:", error);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);

    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);

    return NextResponse.json({ message: "Failed to delete category" }, { status: 500 });
  }
}

