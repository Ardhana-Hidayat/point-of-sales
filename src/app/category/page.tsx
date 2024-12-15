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
        try {
            const response = await fetch('api/category');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
    
            if (!Array.isArray(data)) {
                throw new Error('Data format is invalid. Expected an array.');
            }
    
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
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
