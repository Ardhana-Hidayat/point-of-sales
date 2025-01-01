'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CATEGORY_COLUMN } from "@/constant"
import { FormEditCategory } from "@/components/form/FormEditCategory"
import { ConfirmDelete } from "../../ConfirmDelete"
import { Category } from "@/interface";
import DateFormatter from "@/formatter";
import { Card, CardContent } from "@/components/ui/card"
import { LoadingComponent } from "../../Loading"

interface TableCategoryProps {
  categories: Category[] | null | undefined;
  onRefresh: () => void;
  loading: boolean;
}

export function TableCategory({ categories, onRefresh, loading }: TableCategoryProps) {
  const checkCategories = Array.isArray(categories) ? categories : [];

  return (
    <Card className="shadow-none">
      <CardContent>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              {CATEGORY_COLUMN.map((item: string, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <LoadingComponent />
                </TableCell>
              </TableRow>
            ) : (
              checkCategories.length === 0 || checkCategories === null ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Tidak ada data kategori yang tersedia.
                  </TableCell>
                </TableRow>
              ) : (
                checkCategories.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <DateFormatter data={item.createdAt} />
                    </TableCell>
                    <TableCell>
                      <DateFormatter data={item.updatedAt} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <FormEditCategory categoryId={item.id} categoryName={item.name} onRefresh={onRefresh} />
                        <ConfirmDelete dataId={item.id} dataName={item.name} apiUrl="category" onRefresh={onRefresh} />
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