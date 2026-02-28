import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;


export const useProductStore = create((set) => ({

    products: [],
    setProducts: (products) => set({ products }),

    // ✅ Create Product
    createProduct: async (newProduct) => {
        if (
            !newProduct.name?.trim() ||
            !newProduct.image?.trim() ||
            newProduct.price === "" ||
            newProduct.price == null
        ) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            const res = await fetch(`${API_URL}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            const data = await res.json();
            if (!res.ok) return { success: false, message: data.message || "Error creating product" };

            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            console.error("Error creating product:", error);
            return { success: false, message: "Network error" };
        }
    },

    // ✅ Fetch All Products
    fetchProducts: async () => {
        try {
            const res = await fetch(`${API_URL}/api/products`);
            const data = await res.json();
            set({ products: data.data || [] });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },

    // ✅ Delete Product
    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`${API_URL}/api/products/${pid}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            set((state) => ({
                products: state.products.filter((product) => product._id !== pid),
            }));

            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error deleting product:", error);
            return { success: false, message: "Network error" };
        }
    },

    // ✅ Update Product
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`${API_URL}/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? data.data : product
                ),
            }));

            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error updating product:", error);
            return { success: false, message: "Network error" };
        }
    },
}));
