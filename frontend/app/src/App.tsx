import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServiceProviderDashboard from "./pages/ServiceProviderDashboard";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Box, CircularProgress } from "@mui/material";
import { AuthProvider, useAuth } from "./context/AuthContext";
import UserDashboard from "./pages/UserDashboard";
import BookingPage from "./pages/BookingPage";

// Component to handle conditional dashboard routing
const DashboardRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to appropriate dashboard based on user role
  if (user.role === "service_provider") {
    return <ServiceProviderDashboard />;
  }

  // For other roles or if no specific dashboard, redirect to home
  return <Navigate to="/" />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Public routes - accessible when not authenticated */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["service_provider"]}>
                <DashboardRoute />
              </ProtectedRoute>
            }
          />

          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/bookings/:bookingId" element={<BookingPage />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
