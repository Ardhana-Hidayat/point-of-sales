import { CategorySchema } from '@/lib/form-schema';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = CategorySchema.parse(body);
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
      },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: "Error" }, { status: 400 });
    }

    console.error("Error creating category:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}