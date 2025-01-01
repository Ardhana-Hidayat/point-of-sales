'use client'

import * as React from "react"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductSchema } from "@/lib/form-schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/interface";

interface SelectCategoryProps {
    categories: Category[]
    onRefresh: () => void
}

export function FormAddProduct({ onRefresh, categories }: SelectCategoryProps) {
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            price: 0,
            stock: 0,
            idCategory: 0,
        },
    });

    const { toast } = useToast()

    const onSubmit = async (val: z.infer<typeof ProductSchema>) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(val),
            });

            const data = await response.json();
            console.log('Product added successfully:', data);

            form.reset();
            toast({
                title: 'Berhasil tambah data!',
                description: `Produk "${data.name}" berhasil ditambahkan.`,
                style: {
                    color: 'green',
                },
            });
            if (onRefresh) onRefresh()
        } catch (error) {
            console.error('Error adding product:', error);

            toast({
                title: 'Gagal tambah data!',
                description: 'Terjadi kesalahan saat menambahkan produk.',
                style: {
                    color: 'red',
                },
            });
        }
    };

    const checkCategory = Array.isArray(categories) ? categories : [];

    return (
        <Card className="w-full shadow-none">
            <CardContent>
                <div className="text-center m-5">
                    <label>Form Tambah Produk</label>
                </div>
                <Separator />
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
                                                {checkCategory.length === 0 || checkCategory === null ? (
                                                    <SelectContent className="text-sm text-gray-500 text-center">
                                                        Tidak ada kategori.
                                                    </SelectContent>
                                                ) : (
                                                    <SelectContent>
                                                        {checkCategory.map((category) => (
                                                            <SelectItem
                                                                key={category.id}
                                                                value={category.id.toString()}
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                )}
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="mt-5">
                                <Button type="submit" className="w-full">+ Tambah Produk</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card >
    );
}
