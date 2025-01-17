import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Grid,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Availability {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface AvailabilityFormProps {
  availabilities: Availability[];
  onAvailabilityChange: (availabilities: Availability[]) => void;
}

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
  availabilities,
  onAvailabilityChange
}) => {
  const handleDayChange = (index: number, event: SelectChangeEvent) => {
    const newAvailabilities = [...availabilities];
    newAvailabilities[index] = {
      ...newAvailabilities[index],
      day: event.target.value as Availability['day']
    };
    onAvailabilityChange(newAvailabilities);
  };

  const handleTimeChange = (
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    const newAvailabilities = [...availabilities];
    newAvailabilities[index] = {
      ...newAvailabilities[index],
      [field]: value
    };
    onAvailabilityChange(newAvailabilities);
  };

  const handleDelete = (index: number) => {
    const newAvailabilities = availabilities.filter((_, i) => i !== index);
    onAvailabilityChange(newAvailabilities);
  };

  const addAvailability = () => {
    onAvailabilityChange([
      ...availabilities,
      {
        day: 'Monday',
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      }
    ]);
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Availability Schedule
      </Typography>
      {availabilities.map((availability, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Day</InputLabel>
              <Select
                value={availability.day}
                label="Day"
                onChange={(e) => handleDayChange(index, e)}
              >
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Start Time"
              type="time"
              value={availability.startTime}
              onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="End Time"
              type="time"
              value={availability.endTime}
              onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <IconButton 
              onClick={() => handleDelete(index)}
              color="error"
              sx={{ mt: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button 
        variant="outlined" 
        onClick={addAvailability}
        sx={{ mt: 1 }}
      >
        Add Availability
      </Button>
    </Box>
  );
};

export default AvailabilityForm;
