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
