'use client'

import { useState, useEffect } from "react";
import { FormAddCategory } from "@/components/form/FormAddCategory";
import PageHeader from "@/components/layout/Header";
import { fetchCategories } from "@/lib/fetch-data";
import { ConfirmDelete } from "@/components/organism/ConfirmDelete";
import { FormEditCategory } from "@/components/form/FormEditCategory";
import { Category, ColumnConfig } from "@/interface";
import { TableComponent } from "@/components/organism/Table";
import DateFormatter from "@/formatter";

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await fetchCategories();
            if (!response) throw new Error("No response from fetchCategories");

            setCategories(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            setCategories([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns: ColumnConfig<Category>[] = [
        { key: "name", header: "Kategori", render: (item) => item.name },
        { 
            key: "createdAt", 
            header: "Dibuat", 
            render: (item) => {
                return (
                    <DateFormatter data={item.createdAt} />
                )
            } },
        {
            key: "actions",
            header: "Actions",
            render: (item) => {
                return (
                    <div className="flex gap-2" >
                        <FormEditCategory
                            categoryId={item.id}
                            categoryName={item.name}
                            onRefresh={() => fetchData()}
                        />
                        <ConfirmDelete
                            dataId={item.id}
                            dataName={item.name}
                            apiUrl="category"
                            onRefresh={() => fetchData()}
                        />
                    </div >
                )
            },
        },
    ];

    return (
        <div className="ml-5 w-[100%]">
            <div>
                <PageHeader label="Kategori" />
            </div>

            <div className="flex w-full gap-5 mt-5">
                <div>
                    <div>
                        <TableComponent data={categories} columns={columns} loading={loading} emptyMessage="Data kategori kosong." />
                    </div>
                </div>
                <div>
                    <FormAddCategory onRefresh={() => fetchData()} />
                </div>
            </div>
        </div>
    );
}
