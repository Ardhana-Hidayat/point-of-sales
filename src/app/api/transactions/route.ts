import { TransactionSchema } from "@/lib/form-schema";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.transaction.findMany({
      include: {
        details: true,
      },
    });

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No transactions found" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);

    return NextResponse.json(
      { message: "Failed to fetch transactions", error: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = TransactionSchema.parse(body);
    const details = data.details; 
    const validCustomerName = data.customerName || "Unknown Customer";

    for (const detail of details) {
      const product = await prisma.products.findUnique({
        where: { id: detail.idProduct },
      });

      if (!product) {
        return NextResponse.json({ error: `Product with ID ${detail.idProduct} not found` }, { status: 404 });
      }
    }

    const transaction = await prisma.transaction.create({
      data: {
        customerName: validCustomerName,
        transactionCode: data.transactionCode,
        totalPrice: data.totalPrice, 
        payment: data.payment,
        change: data.change,
        status: "SUCCESS",
        details: {
          create: details.map(detail => ({
            idProduct: detail.idProduct,
            quantity: detail.quantity,
            subtotal: detail.subtotal,
          })),
        },
      },
      include: {
        details: true, 
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error adding transaction:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambah transaksi." },
      { status: 500 }
    );
  }
}



