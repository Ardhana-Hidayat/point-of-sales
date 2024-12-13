'use client'

import { useState, useEffect } from "react";
import { FormAddCategory } from "@/components/form/FormAddCategory";
import { TableCategory } from "@/components/organism/TableCategory";

interface Category {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
    onRefresh: () => void
}

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchData = async () => {
        await fetch('api/category')
        .then((res) => res.json())
        .then((data) => setCategories(data))
      }
      useEffect(() => {
        fetchData()
      }, []);

    return (
        <div className="ml-10 w-full">
            <div>
                Category
            </div>

            <div className="flex justify-between mt-5">
                <div>
                    
                    <TableCategory onRefresh={() => fetchData()} categories={categories} />
                </div>
                <div>
                    
                    <FormAddCategory onRefresh={() => fetchData()} />
                </div>
            </div>
        </div>
    );
}
