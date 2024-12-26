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
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { FormEditCategory } from "@/components/form/FormEditCategory"
import { ConfirmDelete } from "../../ConfirmDelete"

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface TableCategoryProps {
  categories: Category[] | null | undefined;
  onRefresh: () => void;
}

export function TableCategory({ categories, onRefresh }: TableCategoryProps) {
  const checkCategories = Array.isArray(categories) ? categories : [];

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          {CATEGORY_COLUMN.map((item: string, index) => (
            <TableHead key={index}>{item}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {checkCategories.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              Tidak ada data kategori yang tersedia.
            </TableCell>
          </TableRow>
        ) : (
          checkCategories.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{format(new Date(item.createdAt), 'dd-MM-yyyy, HH:mm', { locale: id })}</TableCell>
              <TableCell>{format(new Date(item.updatedAt), 'dd-MM-yyyy, HH:mm', { locale: id })}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <FormEditCategory categoryId={item.id} categoryName={item.name} onRefresh={onRefresh} />
                  <ConfirmDelete dataId={item.id} dataName={item.name} apiUrl="category" onRefresh={onRefresh} />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}