'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ADD_PRODUCT_COLUMN } from "@/constant";
import { Category, Product } from "@/interface";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingComponent } from "../../Loading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface TableProductProps {
    products: Product[] | null | undefined;
    categories: Category[];
    onRefresh: () => void;
    addToCart: (product: Product) => void;
    loading: boolean;
}

export function TableAddProduct({ products, loading, addToCart }: TableProductProps) {
    const checkProducts = Array.isArray(products) ? products : [];

    return (
        <Card className="shadow-none">
            <CardContent>
                <Table className="mt-5">
                    <TableHeader>
                        <TableRow>
                            {ADD_PRODUCT_COLUMN.map((item: string, index) => (
                                <TableHead key={index}>{item}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <LoadingComponent />
                                </TableCell>
                            </TableRow>
                        ) : (
                            checkProducts.length === 0 || checkProducts === null ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center text-gray-500">
                                        Tidak ada data produk yang tersedia.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                checkProducts.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>
                                            <div>
                                                <Button size={'sm'} onClick={() => addToCart(item)} className="bg-white border border-gray-200 text-sm hover:bg-slate-300 shadow-none text-slate-900 ">
                                                    <PlusIcon />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}