import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg" sx={{ py: 2, mt: 4, borderTop: '1px solid #ddd' }}>
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; 2024 eCommerce Site. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
