import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const detailTransactions = await prisma.detailTransaction.findMany({
      include: {
        product: true, 
        transaction: true,
      },
    });

    if (!detailTransactions || detailTransactions.length === 0) {
      return NextResponse.json(
        { message: "No detail transactions found" },
        { status: 404 }
      );
    }

    const validatedTransactions = detailTransactions.map((transaction) => {
      if (!transaction.product) {
        throw new Error(
          `Missing product details for transaction ID: ${transaction.id}`
        );
      }

      return {
        id: transaction.id,
        idTransaction: transaction.idTransaction,
        idProduct: transaction.idProduct,
        quantity: transaction.quantity,
        subtotal: transaction.subtotal,
        createdAt: transaction.createdAt,
        product: {
          id: transaction.product.id,
          name: transaction.product.name,
          price: transaction.product.price,
        },
        transaction: {
          id: transaction.transaction.id, 
          customerName: transaction.transaction.customerName,
          totalPrice: transaction.transaction.totalPrice,
          payment: transaction.transaction.payment,
          change: transaction.transaction.change,
          status: transaction.transaction.status,
        },
      };
    });

    return NextResponse.json(validatedTransactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);

    return NextResponse.json(
      { message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
