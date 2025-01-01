'use client'

import { useState, useEffect } from "react";
import PageHeader from "@/components/layout/Header";
import { DetailTransaction } from "@/interface";
import { TableDetailTransaction } from "@/components/organism/Table/TableDetailTransaction";

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

    return (
        <div className="ml-5 w-[150%]">
            <div>
                <PageHeader label="Detail Transaksi" />
            </div>

            <div className="w-full gap-5 mt-5">
                        <div>
                            <TableDetailTransaction onRefresh={() => fetchDataTransactions()} transaction={detailTransaction} loading={loading} />
                        </div>
                {/* <div>
                    <FormAddProduct onRefresh={() => fetchDataTransactions()} categories={categories} />
                </div> */}
            </div>
        </div>
    );
}
