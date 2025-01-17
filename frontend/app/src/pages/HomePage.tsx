import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const services = [
  { title: "Plumber", image: "plumber.png" },
  { title: "Carpenter", image: "carpenter.png" },
  { title: "Electrician", image: "electrician.png" },
  { title: "AC Service/Repair", image: "ac-repair.png" },
  { title: "Barber", image: "barber.png" },
  { title: "Appliance Repair", image: "appliance-repair.png" },
];
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, textAlign: "center", padding: 3 }}>
      {/* Header */}
      <Box sx={{ backgroundColor: "#1976d2", padding: 5, color: "#fff" }}>
        <Typography variant="h3">ServiceSync</Typography>
      </Box>

      {/* Services Section */}
      <Box sx={{ padding: 5 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Services We Provide
        </Typography>
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div
                onClick={() => {
                  navigate("/user-dashboard");
                }}
              >
                <Card sx={{ minHeight: 200 }}>
                  {/* <CardMedia
                  component="img"
                  height="140"
                  image={`/assets/${service.image}`}
                  alt={service.title}
                /> */}
                  <CardContent>
                    <Typography variant="h6">{service.title}</Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          padding: 3,
          color: "#fff",
          marginTop: 5,
        }}
      >
        <Typography variant="body2">Copyright © 2024</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
