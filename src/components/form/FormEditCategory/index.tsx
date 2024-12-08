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
import { CategorySchema } from "@/lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface CategoryByid {
    categoryId: number,
    categoryName: string
}

export function FormEditCategory({ categoryId, categoryName }: CategoryByid) {

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: categoryName,
        },
    });

    const { toast } = useToast()

    const onSubmit = async (val: z.infer<typeof CategorySchema>) => {
        console.log("onSubmit called", val);

        try {
            const response = await fetch(`/api/category/${categoryId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: val.name }),
            });

            const data = await response.json();
            console.log('Category updated successfully:', data);

            form.reset();
            toast({
                title: 'Berhasil edit data!',
                description: `Kategori "${data.name}" berhasil diubah.`,
                style: {
                    color: 'green',
                },
            });
        } catch (error) {
            console.error('Error editing category:', error);

            toast({
                title: 'Gagal edit data!',
                description: 'Terjadi kesalahan saat mengubah kategori.',
                style: {
                    color: 'red',
                },
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} className="bg-transparent shadow-none text-slate-700 hover:bg-slate-100 border border-slate-300">
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby="dialogDescription">
                <DialogHeader>
                    <DialogTitle>Form Edit Kategori</DialogTitle>
                    <DialogDescription id="dialogDescription">
                        Edit data kategori yang diinginkan.
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
                                        <FormLabel className="text-slate-900">Nama Kategori</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ubah Data Kategori" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-5">
                                <Button type="submit" className="w-full">Simpan</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
