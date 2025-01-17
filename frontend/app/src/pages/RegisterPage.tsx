import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    role: "customer", // Default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, role: e.target.value });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone is required');
      return false;
    }
    if (!formData.street.trim() || !formData.city.trim() || !formData.state.trim() || !formData.zipCode.trim()) {
      setError('All address fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.register(formData);
      
      if (response.success) {
        // Redirect to login page with success message
        navigate('/login?registered=true');
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: '600px',
          width: '100%',
          mx: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
          Register
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!error && !formData.name.trim()}
                disabled={loading}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!error && !formData.email.trim()}
                disabled={loading}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!error && !formData.password}
                disabled={loading}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!error && !formData.phone.trim()}
                disabled={loading}
              />
            </Grid>

            {/* Role Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleSelectChange}
                  label="Role"
                  disabled={loading}
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="service_provider">Service Provider</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Address - Street */}
            <Grid item xs={12}>
              <TextField
                label="Street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!error && !formData.street.trim()}
                disabled={loading}
              />
            </Grid>

            {/* Address - City */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!error && !formData.city.trim()}
                disabled={loading}
              />
            </Grid>

            {/* Address - State */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!error && !formData.state.trim()}
                disabled={loading}
              />
            </Grid>

            {/* Address - Zip Code */}
            <Grid item xs={12}>
              <TextField
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!error && !formData.zipCode.trim()}
                disabled={loading}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account?{' '}
          <Button 
            color="primary" 
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Login here
          </Button>
        </Typography>

        {/* Error Snackbar */}
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError("")}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert 
              onClose={() => setError("")} 
              severity="error"
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </Paper>
    </Box>
  );
};

export default RegisterPage;
