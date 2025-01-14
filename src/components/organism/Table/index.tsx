'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card";
import { LoadingComponent } from "../Loading";
import { ColumnConfig } from "@/interface";

interface ReusableTableProps<T> {
    data: T[] | null | undefined;
    columns: ColumnConfig<T>[];
    loading?: boolean;
    emptyMessage?: string;
    onRefresh?: () => void;
}

function safeRender(value: unknown): React.ReactNode {
    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    ) {
        return value;
    }

    return null;
}

export function TableComponent<T>({ data, columns, loading = false, emptyMessage = "No data available" }: ReusableTableProps<T>) {
    const checkData = Array.isArray(data) ? data : [];

    return (
        <Card className="shadow-none">
            <CardContent>
                <Table className="mt-5 w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            {columns.map((col, index) => (
                                <TableHead key={index}>{col.header}</TableHead>
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
                            checkData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center text-gray-500">
                                        {emptyMessage}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                checkData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                      {columns.map((col, colIndex) => (
                                        <TableCell key={colIndex}>
                                          {col.render 
                                            ? (col.render(item))
                                            : safeRender(item[col.key as keyof T] ?? "")
                                          }
                                        </TableCell>
                                      ))}
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
