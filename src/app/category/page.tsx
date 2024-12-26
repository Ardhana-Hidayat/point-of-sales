'use client'

import { useState, useEffect } from "react";
import { FormAddCategory } from "@/components/form/FormAddCategory";
import { TableCategory } from "@/components/organism/Table/TableCategory";
import { LoadingComponent } from "@/components/organism/Loading";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/layout/Header";

interface Category {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
    onRefresh: () => void
}

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await fetch('api/category');
            if (response.ok) {
                setLoading(false)
            }
            const data = await response.json();
            setCategories(data);

            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            setCategories([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="ml-5 w-[100%]">
            <div>
                <PageHeader label="Kategori" />
            </div>

            <div className="flex w-full gap-5 mt-5">
                <Card className="shadow-none">
                    <CardContent>
                        {loading ? (
                            <LoadingComponent />
                        ) : (
                            <div>
                                <TableCategory onRefresh={() => fetchData()} categories={categories} />
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div>
                    <FormAddCategory onRefresh={() => fetchData()} />
                </div>
            </div>
        </div>
    );
}
