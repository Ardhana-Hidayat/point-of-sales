'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ConfirmDelete } from "../../ConfirmDelete"
import { PRODUCT_COLUMN } from "@/constant";
import { FormEditProduct } from "@/components/form/FormEditProduct";
import { Category, Product } from "@/interface";
import { DateFormatter, FormatCurrencyIDR } from "@/formatter";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingComponent } from "../../Loading";

interface TableProductProps {
    products: Product[] | null | undefined;
    categories: Category[];
    onRefresh: () => void;
    loading: boolean;
}

export function TableProduct({ categories, products, onRefresh, loading }: TableProductProps) {
    const checkProducts = Array.isArray(products) ? products : [];

    return (
        <Card className="shadow-none">
            <CardContent>
                <Table className="mt-5">
                    <TableHeader>
                        <TableRow>
                            {PRODUCT_COLUMN.map((item: string, index) => (
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
                                        <TableCell>
                                            <FormatCurrencyIDR amount={item.price} />
                                        </TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                        <TableCell>{item.category.name}</TableCell>
                                        <TableCell>
                                            <DateFormatter data={item.createdAt} />
                                        </TableCell>
                                        {/* <TableCell>
                                            <DateFormatter data={item.updatedAt} />
                                        </TableCell> */}
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <FormEditProduct productId={item.id} productName={item.name} productPrice={item.price} productStock={item.stock} productCategory={item.idCategory} onRefresh={onRefresh} categories={categories} />
                                                <ConfirmDelete dataId={item.id} dataName={item.name} apiUrl="products" onRefresh={onRefresh} />
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