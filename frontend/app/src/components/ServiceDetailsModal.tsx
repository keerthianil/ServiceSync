import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Chip,
  Box,
} from '@mui/material';

interface ServiceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    category: string;
    price: number;
    location: {
      city: string;
      state: string;
      zipCode: string;
    };
    status: string;
    qualifications?: Array<{
      title: string;
      institute: string;
      year: number;
    }>;
    experience?: Array<{
      title: string;
      description: string;
      years: number;
    }>;
    availability?: Array<{
      day: string;
      startTime: string;
      endTime: string;
      isAvailable: boolean;
    }>;
    averageRating?: number;
  };
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  open,
  onClose,
  service,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">{service.title}</Typography>
        <Chip
          label={service.status}
          color={service.status === 'active' ? 'success' : 'warning'}
          size="small"
          sx={{ ml: 1 }}
        />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary">Description</Typography>
            <Typography variant="body1">{service.description}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="primary">Category</Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {service.category}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="primary">Price</Typography>
            <Typography variant="body1">${service.price}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary">Location</Typography>
            <Typography variant="body1">
              {service.location.city}, {service.location.state} {service.location.zipCode}
            </Typography>
          </Grid>

          {service.qualifications && service.qualifications.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary">Qualifications</Typography>
              {service.qualifications.map((qual, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body1">{qual.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {qual.institute} ({qual.year})
                  </Typography>
                </Box>
              ))}
            </Grid>
          )}

          {service.experience && service.experience.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary">Experience</Typography>
              {service.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body1">{exp.title}</Typography>
                  <Typography variant="body2">{exp.description}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.years} years
                  </Typography>
                </Box>
              ))}
            </Grid>
          )}

          {service.availability && service.availability.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary">Availability</Typography>
              <Grid container spacing={1}>
                {service.availability.map((slot, index) => (
                  <Grid item key={index}>
                    <Chip
                      label={`${slot.day}: ${slot.startTime}-${slot.endTime}`}
                      color={slot.isAvailable ? 'success' : 'error'}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {service.averageRating !== undefined && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary">Rating</Typography>
              <Typography variant="body1">
                {service.averageRating.toFixed(1)} / 5.0
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceDetailsModal;
