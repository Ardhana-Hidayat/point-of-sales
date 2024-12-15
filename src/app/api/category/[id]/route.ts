import { CategorySchema } from "@/lib/form-schema";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

// PATCH method
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = CategorySchema.parse(body);

    const { id } = context.params; 
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "ID tidak valid. Harus berupa angka." }, { status: 400 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parsedId },
      data: { name: data.name },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Kesalahan validasi:", error.errors);
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    console.error("Kesalahan saat memperbarui kategori:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui kategori." },
      { status: 500 }
    );
  }
}

// DELETE method
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params; // Akses params melalui context.params

    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: parsedId },
    });

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.error("Kesalahan saat menghapus kategori:", error);
    return NextResponse.json({ message: "Gagal menghapus kategori" }, { status: 500 });
  }
}
