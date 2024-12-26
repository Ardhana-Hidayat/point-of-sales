'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ProductSchema } from "@/lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductByid {
    productId: number,
    productName: string,
    productPrice: number,
    productStock: number,
    productCategory: number,
    categories: Category[],
    onRefresh?: () => void,
}

export interface Category {
    id: number;
    name: string;
}

export function FormEditProduct({ productId, productName, productPrice, productStock, productCategory, onRefresh, categories }: ProductByid) {
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: productName,
            price: productPrice,
            stock: productStock,
            idCategory: productCategory,
        },
    });

    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()

    const onSubmit = async (val: z.infer<typeof ProductSchema>) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: val.name, price: val.price, stock: val.stock, idCategory: val.idCategory }),
            });

            const data = await response.json();
            console.log('data: ', data);

            form.reset();
            toast({
                title: 'Berhasil edit data!',
                description: `Produk ${data.name} berhasil diubah.`,
                style: {
                    color: 'green',
                },
            });
            setIsOpen(false)
            if (onRefresh) onRefresh()
        } catch (error) {
            console.error('Error editing product:', error);
            console.log(val)
            toast({
                title: `Gagal edit data!`,
                description: 'Terjadi kesalahan saat mengubah produk.',
                style: {
                    color: 'red',
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size={'sm'}
                    className="bg-transparent shadow-none text-slate-700 hover:bg-slate-100 border border-slate-300"
                    onClick={() => setIsOpen(true)}>
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby="dialogDescription">
                <DialogHeader>
                    <DialogTitle>Form Edit Produk</DialogTitle>
                    <DialogDescription id="dialogDescription">
                        Edit data produk yang diinginkan.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-900">Nama Produk</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Nama Produk' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel className="text-slate-900">Harga</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder='Masukkan harga produk'
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value ? Number(value) : "");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='stock'
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel className="text-slate-900">Stok</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder='Jumlah stok'
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value ? Number(value) : "");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="idCategory"
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel className="text-slate-900">Kategori</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                defaultValue={field.value ? field.value.toString() : ""}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category: Category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id.toString()}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-5">
                                <Button type="submit" className="w-full">
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
