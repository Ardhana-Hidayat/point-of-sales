'use client'

import { useState, useEffect } from "react";
import PageHeader from "@/components/layout/Header";
import { FormAddProduct } from "@/components/form/FormAddProduct";
import { Category, ColumnConfig, Product } from "@/interface";
import { fetchCategories, fetchProducts } from "@/lib/fetch-data";
import { DateFormatter, FormatCurrencyIDR } from "@/formatter";
import { FormEditProduct } from "@/components/form/FormEditProduct";
import { ConfirmDelete } from "@/components/organism/ConfirmDelete";
import { TableComponent } from "@/components/organism/Table";

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

    const columns: ColumnConfig<Product>[] = [
            { key: "name", header: "Produk", render: (item) => item.name },
            { 
                key: "price", 
                header: "Harga", 
                render: (item) => {
                    return (
                        <FormatCurrencyIDR amount={item.price} />
                    )
                } },
            { key: "stock", header: "Stok", render: (item) => item.stock },
            { key: "category", header: "Kategori", render: (item) => item.category.name },
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
                            <FormEditProduct
                                productId={item.id}
                                productName={item.name}
                                productCategory={item.category.id}
                                productPrice={item.price}
                                productStock={item.stock}
                                categories={categories}
                                onRefresh={() => fetchData()}
                            />
                            <ConfirmDelete
                                dataId={item.id}
                                dataName={item.name}
                                apiUrl="products"
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
                <PageHeader label="Produk" />
            </div>

            <div className="flex w-full gap-5 mt-5">
                <div>
                    <TableComponent data={products} columns={columns} loading={loading} emptyMessage="Data produk kosong." />
                </div>
                <div>
                    <FormAddProduct onRefresh={() => fetchData()} categories={categories} />
                </div>
            </div>
        </div>
    );
}
