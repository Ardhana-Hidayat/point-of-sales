import { ProductSchema } from "@/lib/form-schema";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = ProductSchema.parse(body);

    const { id } = context.params; 
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "ID tidak valid. Harus berupa angka." }, { status: 400 });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: parsedId },
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        idCategory: data.idCategory,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Kesalahan validasi:", error.errors);
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    console.error("Kesalahan saat memperbarui produk:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memperbarui produk." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params; 

    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const deletedProduct = await prisma.products.delete({
      where: { id: parsedId },
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("Kesalahan saat menghapus produk:", error);
    return NextResponse.json({ message: "Gagal menghapus produk" }, { status: 500 });
  }
}
