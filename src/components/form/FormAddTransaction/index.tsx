'use client'

import * as React from "react"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TransactionSchema } from "@/lib/form-schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Product } from "@/interface";
import Cart from "@/components/organism/Cart";
import { generateUniqueTransactionCode } from "@/formatter";

interface CartProductProps {
    cart: Product[];
    onRefresh: () => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
}

export default function FormAddTransaction({ onRefresh, cart, updateQuantity, removeItem }: CartProductProps) {
    const form = useForm<z.infer<typeof TransactionSchema>>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: {
            customerName: '',
            transactionCode: '',
            totalPrice: 0,
            payment: 0,
            change: 0,
            status: "PENDING",
            details: [],
        },
    });

    const { toast } = useToast();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateChange = () => {
        const total = calculateTotal();
        const payment = form.watch('payment') || 0;
        return Math.max(payment - total, 0);
    };

    const onSubmit = async (val: z.infer<typeof TransactionSchema>) => {
        try {
            const uniqueCode = generateUniqueTransactionCode();
            const total = calculateTotal();
            const change = calculateChange();

            const transactionData = {
                customerName: val.customerName,
                transactionCode: uniqueCode,
                totalPrice: total,
                payment: val.payment,
                change: change,
                status: "SUCCESS",
                details: cart.map((item) => ({
                    idProduct: item.id,
                    quantity: item.quantity,
                    subtotal: item.price * item.quantity,
                })),
            };

            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            const data = await response.json();
            console.log('Transaction added successfully:', data);

            form.reset();
            toast({
                title: 'Berhasil tambah data!',
                description: `Transaksi baru berhasil ditambahkan.`,
                style: {
                    color: 'green',
                },
            });
            if (onRefresh) onRefresh();
            console.log(transactionData)

        } catch (error) {
            console.error('Error adding transaction:', error);

            toast({
                title: 'Gagal tambah data!',
                description: 'Terjadi kesalahan saat menambah transaksi.',
                style: {
                    color: 'red',
                },
            });
        }
    };

    return (
        <Card className="w-full shadow-none">
            <CardContent>
                <div className="text-center m-4">
                    <label className="font-semibold text-lg">Transaksi Baru</label>
                </div>

                <Separator />

                <div className="text-center m-5">
                    <label>Produk yang Dipilih</label>
                </div>

                <div>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Belum ada produk yang dipilih.</p>
                    ) : (
                        <Cart
                            cart={cart}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                        />
                    )}
                </div>

                <div className="mt-5">
                    <Form {...form}>
                        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-900">Nama Pelanggan</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Masukkan Nama Pelanggan" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Total */}
                            <FormField
                                control={form.control}
                                name="totalPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-900">Total (Rp)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Total Harga"
                                                {...field}
                                                value={calculateTotal().toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                })}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Payment */}
                            <FormField
                                control={form.control}
                                name="payment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-900">Pembayaran</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Masukkan Jumlah Bayar"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value ? Number(value) : 0);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Change */}
                            <FormField
                                control={form.control}
                                name="change"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-900">Kembalian (Rp)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Kembalian"
                                                {...field}
                                                value={calculateChange().toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                })}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="mt-5">
                                <Button type="submit" className="w-full">+ Tambah Transaksi</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    );
}
