'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CATEGORY_COLUMN } from "@/constant"
import { useEffect, useState } from "react"
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { FormEditCategory } from "@/components/form/FormEditCategory"
import { ConfirmDelete } from "../ConfirmDelete"

interface Category {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
}

export function TableCategory() {
  const [category, setCategory] = useState<Category[]>([])
  
  const fetchData = async () => {
    await fetch('api/category')
    .then((res) => res.json())
    .then((data) => setCategory(data))
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Card className="shadow-none w-[700px]">
      <CardContent>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              {CATEGORY_COLUMN.map((item: string, index) => {
                return <TableHead key={index}>{item}</TableHead>
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{format(new Date(item.createdAt), 'dd MMMM yyyy, HH:mm', {locale: id})}</TableCell>
                <TableCell>{format(new Date(item.updatedAt), 'dd MMMM yyyy, HH:mm', {locale: id})}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <FormEditCategory categoryId={item.id} categoryName={item.name} onRefresh={() => fetchData()}/>
                    <ConfirmDelete categoryId={item.id} categoryName={item.name} onRefresh={() => fetchData()}/>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
