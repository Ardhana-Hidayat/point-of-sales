'use client'

import { useState, useEffect } from "react";
import PageHeader from "@/components/layout/Header";
import { Category, Product, Transaction } from "@/interface";
import DashboardTransaction from "@/components/organism/DashboardTransaction";
import { fetchCategories, fetchProducts, fetchTransactions } from "@/lib/fetch-data";
import FormAddTransaction from "@/components/form/FormAddTransaction";

interface CartItem extends Product {
    quantity: number;
}

export default function TransactionPage() {
    const [transaction, setTransaction] = useState<Transaction[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [transactionData, productData, categoryData] = await Promise.all([
                fetchTransactions(),
                fetchProducts(),
                fetchCategories()
            ]);

            setTransaction(transactionData);
            setProducts(productData);
            setCategories(categoryData);

            if (transactionData.length === 0 || productData.length === 0 || categoryData.length === 0) {
                console.log("One or more data sets are empty.");
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    const addToCart = (product: Product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        setCart(
            cart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeFromCartById = (productId: number) => {
        const updatedCart = cart.filter((item) => item.id !== productId); 
        setCart(updatedCart); 
        localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    };

    return (
        <div className="ml-5 w-[100%]">
            <div>
                <PageHeader label="Transaksi" />
            </div>

            <div className="flex w-full gap-5 mt-5">
                <div>
                    <DashboardTransaction
                        products={products}
                        transaction={transaction}
                        categories={categories}
                        onRefresh={fetchData}
                        addToCart={addToCart}
                        loading={loading}
                    />
                </div>
                <div>
                    <FormAddTransaction onRefresh={fetchData} cart={cart} updateQuantity={updateQuantity} removeItem={removeFromCartById} />
                </div>
            </div>
        </div>
    );
}