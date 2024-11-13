import { lazy, Suspense } from "react";
import React from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { Box, LinearProgress, linearProgressClasses } from '@mui/material';
import { Layout } from "../layouts";
import AdminLayout from "../layouts/admin";
import ProductDetail from '../pages/ProductDetail';
import { useAuth } from "../context/AuthContext";
import LoadingFallback from "../components/LoadingFallBack";
import OrderHistory from "../pages/Orders/OrderHistory";

// Lazy load the pages
const SignInPage = lazy(() => import("../pages/Login/SignInSide"));
const SignUpPage = lazy(() => import("../pages/SignUp"));
const ProductsPage = lazy(() => import("../pages/Products"));
const CartPage = lazy(() => import("../pages/Cart"));
const OrdersPage = lazy(() => import("../pages/Orders"));

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => (theme.palette.mode === 'light' ? '#f5f5f5' : '#303030'),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

// Admin Route Wrapper with Access Control
const AdminRouteWrapper: React.FC = () => {
  const { isAdmin, isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <AdminLayout isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
      <Suspense fallback={renderFallback}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  );
};

// Protected Route Wrapper for General Authenticated Routes
const ProtectedRouteWrapper: React.FC = () => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (isAdmin) return <Navigate to="/admin/orders" replace />;

  return (
    <Layout  isLoggedIn={isLoggedIn}>
      <Suspense fallback={renderFallback}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

// Define Routes with Protected and Admin Wrappers
export const router = createBrowserRouter([
  {
    element: <AdminRouteWrapper />,
    children: [
      { path: 'admin/orders', element: <OrdersPage /> },
    ],
  },
  {
    element: <ProtectedRouteWrapper />,
    children: [
      { path: '/', element: <ProductsPage />, index: true },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'order-history', element: <OrderHistory />}
    ],
  },
  {
    path: 'signup',
    element: (
      <Suspense fallback={renderFallback}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: 'login',
    element: (
      <Suspense fallback={renderFallback}>
        <SignInPage />
      </Suspense>
    ),
  },
]);
