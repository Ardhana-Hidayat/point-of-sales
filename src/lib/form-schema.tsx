import { z } from 'zod';

export const CategorySchema = z.object({
    name: z.string().min(1, "Nama kategori tidak boleh kosong"),
});
