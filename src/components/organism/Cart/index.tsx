'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Product } from "@/interface";
import { CART_COLUMN } from "@/constant";

interface CartProps {
    cart: Product[];
    updateQuantity: (productId: number, newQuantity: number) => void;
    removeItem: (productId: number) => void;
}

export default function Cart({ cart, updateQuantity, removeItem }: CartProps) {
    return (
        <Table className="mt-5">
            <TableHeader>
                <TableRow>
                    {CART_COLUMN.map((column, index) => (
                        <TableHead key={index}>{column}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {cart.map((item, index) => (
                    <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                            {item.price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            })}
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                <Button
                                    className="bg-white border px-2 border-gray-200 text-sm hover:bg-slate-300 shadow-none text-slate-900"
                                    onClick={() =>
                                        updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                                    }
                                >
                                    -
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                    className="bg-white border px-2 border-gray-200 text-sm hover:bg-slate-300 shadow-none text-slate-900"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Button
                                className="bg-white border px-2 border-gray-200 text-sm hover:bg-slate-300 shadow-none text-red-500"
                                onClick={() => removeItem(item.id)}
                            >
                                <Trash2 />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
