'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ConfirmDelete } from "../../ConfirmDelete"
import { PRODUCT_COLUMN } from "@/constant";
import { FormEditProduct } from "@/components/form/FormEditProduct";

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    idCategory: number;
    category: Category;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: number;
    name: string;
}

interface TableProductProps {
    products: Product[] | null | undefined;
    categories: Category[];
    onRefresh: () => void;
}

export function TableProduct({ categories, products, onRefresh }: TableProductProps) {
    const checkProducts = Array.isArray(products) ? products : [];

    return (
        <Table className="mt-5">
            <TableHeader>
                <TableRow>
                    {PRODUCT_COLUMN.map((item: string, index) => (
                        <TableHead key={index}>{item}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {checkProducts.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500">
                            Tidak ada data produk yang tersedia.
                        </TableCell>
                    </TableRow>
                ) : (
                    checkProducts.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>{item.category.name}</TableCell>
                            <TableCell>{format(new Date(item.createdAt), 'dd-MM-yyyy, HH:mm', { locale: id })}</TableCell>
                            <TableCell>{format(new Date(item.updatedAt), 'dd-MM-yyyy, HH:mm', { locale: id })}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <FormEditProduct productId={item.id} productName={item.name} productPrice={item.price} productStock={item.stock} productCategory={item.idCategory} onRefresh={onRefresh} categories={categories} />
                                    <ConfirmDelete dataId={item.id} dataName={item.name} apiUrl="products" onRefresh={onRefresh} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}