'use client'

import { useState, useEffect } from "react";
import { TableProduct } from "@/components/organism/Table/TableProduct";
import PageHeader from "@/components/layout/Header";
import { FormAddProduct } from "@/components/form/FormAddProduct";
import { Category, Product } from "@/interface";
import { fetchCategories, fetchProducts } from "@/lib/fetch-data";

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productData, categoryData] = await Promise.all([
                fetchProducts(),
                fetchCategories()
            ]);
    
            if (productData.length === 0 && categoryData.length === 0) {
                console.warn("data is empty.");
            } else {
                setProducts(productData);
                setCategories(categoryData);
            }
    
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };    

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="ml-5 w-[100%]">
            <div>
                <PageHeader label="Produk" />
            </div>

            <div className="flex w-full gap-5 mt-5">
                <div>
                    <TableProduct onRefresh={() => fetchData()} categories={categories} products={products} loading={loading} />
                </div>
                <div>
                    <FormAddProduct onRefresh={() => fetchData()} categories={categories} />
                </div>
            </div>
        </div>
    );
}
