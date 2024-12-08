'use client'

import * as React from "react"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CategorySchema } from "@/lib/form-schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

export function FormAddCategory() {

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
        },
    });

    const { toast } = useToast()

    const onSubmit = async (val: z.infer<typeof CategorySchema>) => {
        try {
            const response = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(val),
            });

            const data = await response.json();
            console.log('Category added successfully:', data);

            form.reset();
            toast({
                title: 'Berhasil tambah data!',
                description: `Kategori "${data.name}" berhasil ditambahkan.`,
                style: {
                    color: 'green',
                },
            });
        } catch (error) {
            console.error('Error adding category:', error);

            toast({
                title: 'Gagal tambah data!',
                description: 'Terjadi kesalahan saat menambahkan kategori.',
                style: {
                    color: 'red',
                },
            });
        }
    };

    return (
        <Card className="w-[300px] shadow-none">
            <CardContent>
                <div className="text-center m-5">
                    <label>Form Tambah Kategori</label>
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
                                        <FormLabel className="text-slate-900">Nama Kategori</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Tambahkan Kategori Baru' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-5">
                                <Button type="submit" className="w-full">+ Tambah</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}
