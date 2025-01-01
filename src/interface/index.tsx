export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    idCategory: number;
    category: Category;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: number;
    name: string;
    actions: string;
    createdAt: string;
    updatedAt: string;
    onRefresh: () => void;
}

export interface Transaction {
    id: number;
    transactionCode: string;
    customerName: string;
    totalPrice: number;
    payment: number;
    change: number;
    status: string;
    details: DetailTransaction[];
    createdAt: string;
}

export interface DetailTransaction {
    id: number;
    idTransaction: number;
    idProduct: number;
    quantity: number;
    subtotal: number;
    transaction: Transaction;
    product: Product;
    createdAt: string;
}

export interface ColumnConfig<T> {
    key: keyof T | "actions";
    header: string;
    render?: (item: T) => React.ReactNode;
}
