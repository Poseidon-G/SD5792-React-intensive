import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Example data for orders
const orders = [
  { id: 1, user: 'John Doe', date: '2024-11-01', total: 199.99, status: 'Pending' },
  { id: 2, user: 'Jane Smith', date: '2024-11-02', total: 299.99, status: 'Shipped' },
  { id: 3, user: 'Alice Johnson', date: '2024-11-03', total: 159.99, status: 'Delivered' },
];

export default function AdminOrdersPage() {
  const navigate = useNavigate();

  const handleViewOrder = (orderId: number) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleViewOrder(order.id)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
