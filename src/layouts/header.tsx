import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { logOutAction } from '../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

interface HeaderProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
}

const Header = ({ isLoggedIn, isAdmin }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logOutAction())
  }
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft:2 }} >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          eCommerce Site
        </Link>
        </Typography>
        { !isAdmin &&  <Button component={Link} to="/cart" color="inherit">Cart</Button>}
        {isLoggedIn ? (
          <>
            <Button component={Link} to="/order-history" color="inherit">Order History</Button>
            <Button color="inherit" 
              onClick={handleLogout}
              >Logout</Button>
          </>
        ) : (
          <Button component={Link} to="/login" color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
