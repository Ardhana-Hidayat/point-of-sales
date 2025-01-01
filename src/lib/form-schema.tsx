import { z } from 'zod';

export const CategorySchema = z.object({
    name: z.string().min(1, "Nama kategori tidak boleh kosong"),
});

export const ProductSchema = z.object({
    name: z.string().min(1, "Nama produk tidak boleh kosong"),
    price: z.number().int().min(1, "Harga produk tidak boleh kosong"),
    stock: z.number().int().min(1, "Stok tidak boleh kosong"),
    idCategory: z.number().int().min(1, "Kategori tidak boleh kosong"),
});

const TransactionStatus = z.enum(["PENDING", "SUCCESS"]);

export const DetailTransactionSchema = z.object({
    idProduct: z.number().min(1, "Product ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    subtotal: z.number().min(0, "Subtotal must be a positive number"),
});

export const TransactionSchema = z.object({
    customerName: z.string().optional(),
    transactionCode: z.string(),
    totalPrice: z.number().int().nonnegative("Subtotal tidak boleh negatif"),
    payment: z.number().int().min(1, "Pembayaran tidak boleh kosong"),
    change: z.number().int().nonnegative("Kembalian tidak boleh negatif"),
    status: TransactionStatus,
    details: DetailTransactionSchema.array(),
});