import React, { useEffect } from "react";
import { Box, CircularProgress, Grid2 as Grid, Paper, Typography } from "@mui/material"; // Use Grid from @mui/material
import { styled } from "@mui/material/styles";
import ProductItem from "../../components/Products/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProductAction } from "../../redux/reducers/productReducer";

const Loading: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading...
            </Typography>
        </Box>
    );
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// 4 items per row
const itemsPerRow = 4;
const categoryFilter: { [key: string]: number } = {
    electronics: 24,
    fashion: 12,
    food: 18,
    services: 3,
};

export const useProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.auth.token);
    console.log("token in useProducts", token);
    let products = useSelector((state: RootState) => state.products.products);
    const loading = useSelector((state: RootState) => state.products.loading);
    const error = useSelector((state: RootState) => state.products.error);
    
    products = products.filter((product) => {
        const categoryCode: string = product.category.code;
        const imgName = product.img;
        const imgNumberMatch = imgName.match(/\d+/); // Extract numeric part of the image name

        if (imgNumberMatch) {
            const imgNumber = parseInt(imgNumberMatch[0], 10); // Convert to number
            const categoryLimit = categoryFilter[categoryCode];

            if (categoryLimit !== undefined && imgNumber <= categoryLimit) {
                return true;
            }
        }

        return false;
    });

    useEffect(() => {
        if(token) dispatch(fetchProductAction(token));
    }, [dispatch]);

    return { products, loading, error };
};

const Products = () => {
    const { products, loading, error } = useProducts();


    if (loading) {
        return <Loading />;
    }
    return (

        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                    <ProductItem product={product} />
                </Grid>
            ))}

        </Grid>

    );
};

export default Products;