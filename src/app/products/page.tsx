'use client'

import { useState, useEffect } from "react";
import { LoadingComponent } from "@/components/organism/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { TableProduct } from "@/components/organism/Table/TableProducts";
import PageHeader from "@/components/layout/Header";
import { FormAddProduct } from "@/components/form/FormAddProduct";

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    idCategory: number;
    category: Category;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: number;
    name: string;
}

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true)

    const fetchDataProduct = async () => {
        try {
            const response = await fetch('api/products');
            if (response.ok) {
                setLoading(false)
            }
            const data = await response.json();
            setProducts(data);

            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            setProducts([]);
        }
    };
    const fetchDataCategory = async () => {
        try {
            const response = await fetch('api/category');
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
        fetchDataProduct();
        fetchDataCategory();
    }, []);


    return (
        <div className="ml-5 w-[100%]">
            <div>
                <PageHeader label="Produk" />
            </div>

            <div className="flex w-full gap-5 mt-5">
                <Card className="shadow-none">
                    <CardContent>
                        {loading ? (
                            <LoadingComponent />
                        ) : (
                            <div>
                                <TableProduct onRefresh={() => fetchDataProduct()} categories={categories} products={products} />
                            </div>
                        )}
                    </CardContent>
                </Card>
                <div>
                    <FormAddProduct onRefresh={() => fetchDataProduct()} categories={categories} />
                </div>
            </div>
        </div>
    );
}
