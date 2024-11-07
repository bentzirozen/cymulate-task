import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const scrapeWebsite = async (url: string) => {
  const response = await api.post('/scraping', { url });
  return response.data;
};

export const getScrapingResults = async () => {
  const response = await api.get('/scraping');
  return response.data;
};

export const login = async (email: string, password: string) => {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};