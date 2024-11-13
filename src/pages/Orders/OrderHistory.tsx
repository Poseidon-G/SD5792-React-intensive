import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    styled,
    Card,
} from '@mui/material';
import axios from 'axios';
import { Order } from '../../types';
import { getOrderHistoryApi } from '../../services/orderService';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import LoadingPage from '../../components/LoadingPage';


const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.secondary,
}));

// Function to map order status to a color
const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'warning';
        case 'completed':
            return 'success';
        case 'cancelled':
            return 'error';
        default:
            return 'default';
    }
};

const OrderSummary = styled(Card)(({ theme }) => ({
    margin: theme.spacing(3, 0),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if(token){

                    const response = await getOrderHistoryApi(token)
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <LoadingPage/>

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>

            {/* Summary Card */}
            <OrderSummary>
                <Typography variant="h6">Total Orders: {orders.length}</Typography>
                <Typography variant="body1" color="text.secondary">
                    Last Updated: {new Date().toLocaleDateString()}
                </Typography>
            </OrderSummary>

            <StyledTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Order Number</StyledTableCell>
                            <StyledTableCell>Product</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Order Date</StyledTableCell>
                            <StyledTableCell>Total Payment</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderNumber}>
                                <TableCell>{order.orderNumber}</TableCell>
                                <TableCell>{order.product.name}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={getStatusColor(order.status)}
                                    />
                                </TableCell>
                                <TableCell>{order.category.name}</TableCell>
                                <TableCell>${order.product.sale_price.toFixed(2)}</TableCell>
                                <TableCell>{new Date(order.created).toLocaleDateString()}</TableCell>
                                <TableCell>${order.payment.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </StyledContainer>
    );
};

export default OrderHistory;