import api from './api';

interface Location {
  city: string;
  state: string;
  zipCode: string;
}

interface Qualification {
  title: string;
  institute: string;
  year: number;
}

interface Experience {
  title: string;
  description: string;
  years: number;
}

interface Availability {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface ServiceData {
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'carpentry' | 'cleaning' | 'painting' | 'other';
  price: number;
  location: Location;
  qualifications?: Qualification[];
  experience?: Experience[];
  availability?: Availability[];
  status?: 'pending' | 'active' | 'inactive';
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const serviceAPI = {
  // Create a new service
  createService: async (serviceData: ServiceData): Promise<ApiResponse<any>> => {
    try {
      console.log('Creating service with data:', serviceData);
      const response = await api.post<ApiResponse<any>>('/services', {
        ...serviceData,
        status: 'pending', // Set default status
        qualifications: serviceData.qualifications || [],
        experience: serviceData.experience || [],
        availability: serviceData.availability || [{
          day: 'Monday',
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true
        }]
      });
      console.log('Service creation response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Service creation error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to create service');
    }
  },

  // Get all services by provider
  getProviderServices: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await api.get<ApiResponse<any[]>>('/services/provider/services');
      return response.data;
    } catch (error: any) {
      console.error('Get provider services error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch services');
    }
  },

  // Get provider's bookings
  getProviderBookings: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await api.get<ApiResponse<any[]>>('/bookings/provider');
      return response.data;
    } catch (error: any) {
      console.error('Get provider bookings error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  },

  // Get provider's reviews
  getProviderReviews: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await api.get<ApiResponse<any[]>>('/reviews/provider');
      return response.data;
    } catch (error: any) {
      console.error('Get provider reviews error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
    }
  },

  // Update service status
  updateServiceStatus: async (serviceId: string, status: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.put<ApiResponse<any>>(`/services/${serviceId}`, { status });
      return response.data;
    } catch (error: any) {
      console.error('Update service status error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to update status');
    }
  },

  // Get single service
  getSingleService: async (serviceId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get<ApiResponse<any>>(`/services/${serviceId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get single service error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to fetch service');
    }
  },

  // Delete service
  deleteService: async (serviceId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.delete<ApiResponse<any>>(`/services/${serviceId}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete service error:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to delete service');
    }
  }
};
