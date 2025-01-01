'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TRANSACTION_COLUMN } from "@/constant"
import DateFormatter from "@/formatter";
import { Transaction } from "@/interface";
import { LoadingComponent } from "../../Loading";
import { Card, CardContent } from "@/components/ui/card";

interface TransactionProps {
    transaction: Transaction[] | null | undefined;
    onRefresh: () => void;
    loading: boolean;
}

export function TableTransaction({ transaction, loading }: TransactionProps) {
    const checkTransaction = Array.isArray(transaction) ? transaction : [];

    return (
        <Card className="shadow-none">
            <CardContent>
                <Table className="mt-5">
                    <TableHeader>
                        <TableRow>
                            {TRANSACTION_COLUMN.map((item: string, index) => (
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
                            checkTransaction.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center text-gray-500">
                                        Tidak ada data transaksi yang tersedia.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                checkTransaction.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.transactionCode}</TableCell>
                                        <TableCell>{item.customerName}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                            <DateFormatter data={item.createdAt} />
                                        </TableCell>
                                        {/* <TableCell>
                                <div className="flex gap-2">
                                    <FormEditCategory categoryId={item.id} categoryName={item.customerName} onRefresh={onRefresh} />
                                    <ConfirmDelete dataId={item.id} dataName={item.customerName} apiUrl="category" onRefresh={onRefresh} />
                                </div>
                            </TableCell> */}
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