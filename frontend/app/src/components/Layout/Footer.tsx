import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About ServiceSync
            </Typography>
            <Typography variant="body2">
              Connecting service providers with customers for quality home services.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Home
              </Link>
              <Link href="/services" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Services
              </Link>
              <Link href="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Contact Us
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2">
              Email: support@servicesync.com
            </Typography>
            <Typography variant="body2">
              Phone: (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} ServiceSync. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
