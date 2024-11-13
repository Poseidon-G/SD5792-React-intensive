import axiosInstance from "../configs/axiosDefault";

export const fetchProductsApi = async (token: string) => {
    try {
        const res = await axiosInstance.get("/api/shop/products", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return res.data;
    } catch (error) {
        throw error;
    }
}