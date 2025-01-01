import { Category, Product, Transaction } from "@/interface";
import { TableAddProduct } from "../Table/TableAddProduct";
import { TableTransaction } from "../Table/TableTransaction";

interface TransactionProps {
    products: Product[] | null | undefined;
    transaction: Transaction[] | null | undefined;
    categories: Category[];
    onRefresh: () => void;
    addToCart: (product: Product) => void;
    loading: boolean;
}

export default function DashboardTransaction({products, categories, transaction, onRefresh, addToCart, loading}: TransactionProps) {
    return(
        <div className="space-y-5">
            <div>
                <TableTransaction transaction={transaction} onRefresh={onRefresh} loading={loading} />
            </div>

            <div>
                <TableAddProduct products={products} categories={categories} onRefresh={onRefresh} addToCart={addToCart} loading={loading} />
            </div>
        </div>
    )
}