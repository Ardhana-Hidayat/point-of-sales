
export async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        if (response.ok) {
            return await response.json(); 
        }
        if (response.status === 404) {
            console.warn('Products not found (404). Returning empty array.');
            return []; 
        }
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return []; 
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch('/api/category');
        if (response.ok) {
            return await response.json(); 
        }
        if (response.status === 404) {
            console.warn('Products not found (404). Returning empty array.');
            return []; 
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}

export async function fetchTransactions() {
    try {
        const response = await fetch('/api/transactions');
        if (response.ok) {
            return await response.json(); 
        }
        if (response.status === 404) {
            console.warn('Products not found (404). Returning empty array.');
            return []; 
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        return [];
    }
}
