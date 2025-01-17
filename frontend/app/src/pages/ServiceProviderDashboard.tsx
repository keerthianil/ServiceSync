import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';
import { serviceAPI } from '../services/serviceApi';
import { useAuth } from '../context/AuthContext';
import ServiceDetailsModal from '../components/ServiceDetailsModal';

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
type ServiceCategory = 'plumbing' | 'electrical' | 'carpentry' | 'cleaning' | 'painting' | 'other';

interface ServiceFormData {
  title: string;
  description: string;
  category: ServiceCategory;
  price: string;
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
}

interface Availability {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface ServiceData {
  title: string;
  description: string;
  category: ServiceCategory;
  price: number;
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  availability: Availability[];
  qualifications: any[];
  experience: any[];
}

const initialServiceForm: ServiceFormData = {
  title: '',
  description: '',
  category: 'plumbing',
  price: '',
  location: {
    city: '',
    state: '',
    zipCode: '',
  }
};

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ServiceProviderDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState<ServiceFormData>(initialServiceForm);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const servicesResponse = await serviceAPI.getProviderServices();
      if (servicesResponse.success) {
        setServices(servicesResponse.data);
      }

      const bookingsResponse = await serviceAPI.getProviderBookings();
      if (bookingsResponse.success) {
        setBookings(bookingsResponse.data);
      }

      const reviewsResponse = await serviceAPI.getProviderReviews();
      if (reviewsResponse.success) {
        setReviews(reviewsResponse.data);
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!newService.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!newService.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!newService.price || isNaN(Number(newService.price)) || Number(newService.price) <= 0) {
      setError('Please enter a valid price');
      return false;
    }
    if (!newService.location.city.trim() || !newService.location.state.trim() || !newService.location.zipCode.trim()) {
      setError('All location fields are required');
      return false;
    }
    return true;
  };

  const handleCreateService = async () => {
    try {
      if (!validateForm()) return;

      setLoading(true);
      const serviceData: ServiceData = {
        ...newService,
        price: Number(newService.price),
        availability: [{
          day: 'Monday' as DayOfWeek,
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true
        }],
        qualifications: [],
        experience: []
      };

      console.log('Creating service with data:', serviceData);
      const response = await serviceAPI.createService(serviceData);
      
      if (response.success) {
        setSuccess(true);
        setNewService(initialServiceForm);
        await fetchData();
        setTabValue(0);
      } else {
        throw new Error(response.message || 'Failed to create service');
      }
    } catch (err: any) {
      console.error('Service creation error:', err);
      setError(err.message || 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleViewDetails = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  if (loading && services.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome, {user?.name}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Services" />
          <Tab label="Post New Service" />
          <Tab label="Bookings" />
          <Tab label="Reviews" />
        </Tabs>
      </Box>

      {/* Services Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {services.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                No services posted yet. Create your first service!
              </Typography>
            </Grid>
          ) : (
            services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{service.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {service.category}
                    </Typography>
                    <Typography variant="body2">{service.description}</Typography>
                    <Typography variant="body2">Price: ${service.price}</Typography>
                    <Typography variant="body2">Status: {service.status}</Typography>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      sx={{ mt: 2 }}
                      onClick={() => handleViewDetails(service)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      {/* Post New Service Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={newService.title}
              onChange={(e) => setNewService({ ...newService, title: e.target.value })}
              fullWidth
              required
              error={!!error && !newService.title.trim()}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newService.category}
                label="Category"
                onChange={(e) => setNewService({ ...newService, category: e.target.value as ServiceCategory })}
              >
                <MenuItem value="plumbing">Plumbing</MenuItem>
                <MenuItem value="electrical">Electrical</MenuItem>
                <MenuItem value="carpentry">Carpentry</MenuItem>
                <MenuItem value="cleaning">Cleaning</MenuItem>
                <MenuItem value="painting">Painting</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              fullWidth
              required
              multiline
              rows={4}
              error={!!error && !newService.description.trim()}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              type="number"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              fullWidth
              required
              error={!!error && (!newService.price || Number(newService.price) <= 0)}
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="City"
              value={newService.location.city}
              onChange={(e) => setNewService({ 
                ...newService, 
                location: { ...newService.location, city: e.target.value } 
              })}
              fullWidth
              required
              error={!!error && !newService.location.city.trim()}
              sx={{ mb: 2 }}
            />
            <TextField
              label="State"
              value={newService.location.state}
              onChange={(e) => setNewService({ 
                ...newService, 
                location: { ...newService.location, state: e.target.value } 
              })}
              fullWidth
              required
              error={!!error && !newService.location.state.trim()}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Zip Code"
              value={newService.location.zipCode}
              onChange={(e) => setNewService({ 
                ...newService, 
                location: { ...newService.location, zipCode: e.target.value } 
              })}
              fullWidth
              required
              error={!!error && !newService.location.zipCode.trim()}
              sx={{ mb: 2 }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCreateService}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Service'}
            </Button>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Bookings Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={2}>
          {bookings.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                No bookings yet.
              </Typography>
            </Grid>
          ) : (
            bookings.map((booking) => (
              <Grid item xs={12} key={booking._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Booking ID: {booking._id}</Typography>
                    <Typography variant="body2">Status: {booking.status}</Typography>
                    <Typography variant="body2">
                      Date: {new Date(booking.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      Customer: {booking.customer?.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      {/* Reviews Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={2}>
          {reviews.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                No reviews yet.
              </Typography>
            </Grid>
          ) : (
            reviews.map((review) => (
              <Grid item xs={12} key={review._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Rating: {review.rating}/5</Typography>
                    <Typography variant="body2">{review.comment}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      By: {review.user?.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      {/* Service Details Modal */}
      {selectedService && (
        <ServiceDetailsModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
        />
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Service created successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError("")}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => setError("")} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ServiceProviderDashboard;
