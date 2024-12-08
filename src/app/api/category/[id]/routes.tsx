import { CategorySchema } from "@/lib/form-schema";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    try {
      const body = await req.json();
      const data = CategorySchema.parse(body);
  
      const { id } = data;
  
      const updatedCategory = await prisma.category.update({
        where: { id: id },
        data: {
          name: data.name,
        },
      });
  
      return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ errors: error.errors }, { status: 400 });
      }
  
      console.error("Error updating category:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }