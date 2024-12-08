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
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { FormEditCategory } from "@/components/form/FormEditCategory"

interface Category {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
}

export function TableCategory() {
  const [category, setCategory] = useState<Category[]>([])
  
  useEffect(() => {
    fetch('/api/category')
    .then((res) => res.json())
    .then((data) => setCategory(data))
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
                    <FormEditCategory categoryId={item.id} categoryName={item.name} />
                    <Button size={'sm'} className="bg-transparent shadow-none text-red-500 hover:bg-red-100 border border-slate-300">
                      <Trash2 />
                    </Button>
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
