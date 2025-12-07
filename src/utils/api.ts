import axios from 'axios';

const API_BASE_URL = 'https://smart-event-booking-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface EventData {
  id: number;
  title: string;
  description: string;
  img: string;
  price: number;
  available_seats: number;
  location: string;
  date: string;
}

export interface BookingData {
  event_id: number;
  quantity: number;
  mobile: string;
}

export interface BookingResponse {
  id: number;
  name: string;
  email: string;
  event_title: string;
  quantity: number;
  total_amount: number;
  booking_date: string;
  mobile: string;
  status?: string;
}

export const fetchEvents = async (): Promise<EventData[]> => {
  const response = await api.get('/events');
  return response.data;
};

export const fetchAllBookings = async (): Promise<BookingResponse[]> => {
  const response = await api.get('/bookings');
  return response.data;
};

export const fetchMyBookings = async () => {
  const response = await api.get('/bookings/my-bookings');
  return response.data;
};

export const createBooking = async (bookingData: BookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const loginUser = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const createEvent = async (eventData: FormData) => {
  const response = await api.post('/events', eventData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateEvent = async (id: number, eventData: FormData) => {
  const response = await api.put(`/events/${id}`, eventData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const cancelBooking = async (id: number) => {
  const response = await api.put(`/bookings/cancel/${id}`);
  return response.data;
};

export const deleteEvent = async (id: number) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

export default api;
