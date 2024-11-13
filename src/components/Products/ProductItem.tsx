import React, { useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Chip, Stack, Divider, Button, Tooltip, IconButton, Link } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Product } from "../../types";
import { CartItem } from "../../types/cartType";
import { toast } from "react-toastify";


export default function ProductItem({ product }: { product: Product }) {
    const [hoveredImage, setHoveredImage] = useState(false);

    const handleAddToCart = (product: Product) => {

        //read the cart from local storage
        const cart = localStorage.getItem("cart");
        const addItemm: CartItem = { 
            id: product.id, img: product.img, 
            category: product.category,
            name: product.name, price: product.sale_price, quantity: 1 };

        if (cart) {
            //check if the product is already in the cart
            const cartItems: CartItem[] = JSON.parse(cart);
            const existingProduct = cartItems.find((item) => item.id === product.id);
            if (existingProduct) {
                //product is already in the cart
                existingProduct.quantity += 1;
            } else {
                cartItems.push(addItemm);
            }

            //save the cart to local storage
            localStorage.setItem("cart", JSON.stringify(cartItems));
        } else {
            //cart does not exist
            localStorage.setItem("cart", JSON.stringify([addItemm]));
        }
        
        toast.success("Product added to cart");
    };
    const status = product.in_stock ? "In Stock" : "Out of Stock";
    const renderStatus = (
        <Chip
            label={status}
            color={status === "In Stock" ? "success" : "error"}
            size="small"
            sx={{ fontWeight: 'bold', position: 'absolute', top: 10, right: 10, zIndex: 1, }}
        />
    );

    return (
        <Card sx={{ maxWidth: 500,  position: 'relative' }} elevation={0}>
            {renderStatus}
            <Box sx={{ position: 'relative', width: "100%", paddingTop: "56.25%" }}
                onMouseEnter={() => setHoveredImage(true)}
                onMouseLeave={() => setHoveredImage(false)}
            >
                <CardMedia
                    component="img"
                    image={"/products/" + product.category.code + "/" + product.img}
                    alt={product.name}
                    sx={{ position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", }}
                />
                {hoveredImage && <Box
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 2,
                        borderRadius: 1,
                        padding: '8px 16px', 
                    }}
                >
                    <Tooltip title="View Product" placement="top" arrow>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'white',
                                    backgroundColor:  'rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                <IconButton color="inherit">
                                    <Link href={`/products/${product.id}`} color="inherit" underline="none">
                                        <VisibilityIcon />
                                    </Link>
                                </IconButton>
                            </Box>
                        </Tooltip>
                        <Tooltip title="Add to cart"  placement="top" arrow>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: 'white',
                                    backgroundColor:  'rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                <IconButton color="inherit" onClick={() => handleAddToCart(product)}>
                                    <ShoppingCartIcon />
                                </IconButton>
                            </Box>
                        </Tooltip>
                </Box>
                }
            </Box>
            <Divider />
            <CardContent>
                <Typography variant="h6" component="div" fontWeight="bold">
                    {product.name}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 1 }}>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                        ${product.sale_price}
                    </Typography>
                    {product.regular_price && (
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                            ${product.regular_price}
                        </Typography>
                    )}
                </Stack>

                {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {product.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" variant="outlined" />
                    ))}
                </Box> */}
            </CardContent>
        </Card>
    );
}
