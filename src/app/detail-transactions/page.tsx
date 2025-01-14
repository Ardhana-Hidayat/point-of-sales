'use client'

import { useState, useEffect } from "react";
import PageHeader from "@/components/layout/Header";
import { ColumnConfig, DetailTransaction } from "@/interface";
import { DateFormatter, FormatCurrencyIDR } from "@/formatter";
import { TableComponent } from "@/components/organism/Table";

export default function DetailTransactionPage() {
    const [detailTransaction, setDetailTransaction] = useState<DetailTransaction[]>([]);
    const [loading, setLoading] = useState(true)

    const fetchDataTransactions = async () => {
        try {
            const response = await fetch('api/detail-transactions');
            if (response.ok) {
                setLoading(false)
            }
            const data = await response.json();
            setDetailTransaction(data);

            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
                setDetailTransaction([]);
                setLoading(false)
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            setDetailTransaction([]);
        }
    };

    useEffect(() => {
        fetchDataTransactions();
    }, []);

    const columns: ColumnConfig<DetailTransaction>[] = [
        { key: "actions", header: "Customer", render: (item) => item.transaction.customerName },
        { key: "idProduct", header: "Produk", render: (item) => item.product.name },
        { key: "quantity", header: "Jumlah", render: (item) => item.quantity },
        { 
            key: "actions", 
            header: "Satuan", 
            render: (item) => {
                return (
                    <FormatCurrencyIDR amount={item.product.price} />
                )
            } 
        },
        { 
            key: "subtotal", 
            header: "Total", 
            render: (item) => {
                return (
                    <FormatCurrencyIDR amount={item.subtotal} />
                )
            } 
        },
        { 
            key: "transaction", 
            header: "Pembayaran", 
            render: (item) => {
                return (
                    <FormatCurrencyIDR amount={item.transaction.payment} />
                )
            } 
        },
        { 
            key: "transaction", 
            header: "Kembalian", 
            render: (item) => {
                return (
                    <FormatCurrencyIDR amount={item.transaction.change} />
                )
            } 
        },
        {
            key: "createdAt",
            header: "Dibuat",
            render: (item) => {
                return (
                    <DateFormatter data={item.createdAt} />
                )
            }
        },
    ];

    return (
        <div className="ml-5 w-full">
            <div>
                <PageHeader label="Detail Transaksi" />
            </div>

            <div className="w-[110%] mt-5">
                <div>
                    <TableComponent data={detailTransaction} columns={columns} emptyMessage="Data transaksi kosong." loading={loading} />
                </div>
            </div>
        </div>
    );
}
