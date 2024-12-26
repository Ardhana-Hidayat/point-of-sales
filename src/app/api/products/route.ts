import { ProductSchema } from '@/lib/form-schema';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      include: {
        category: true
      }
    });

    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'No products found' }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      { message: 'Failed to fetch products', error: error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ProductSchema.parse(body);
    const newProduct = await prisma.products.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        idCategory: data.idCategory,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: "Error" }, { status: 400 });
    }

    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}