import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://educapi-v2.onrender.com';
const API_KEY = import.meta.env.VITE_API_KEY || 'Juan263063EZ';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'usersecretpasskey': API_KEY,
    'Content-Type': 'application/json',
  },
});

export interface Card {
  idCard: number;
  name: string;
  description?: string;
  attack: number;
  defense: number;
  lifePoints: number;
  pictureUrl: string;
  attributes?: Record<string, any>;
  userSecret?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  tipo?: string; // For compatibility
}

export const getCards = async (page = 1, limit = 20) => {
  const response = await api.get(`/card?page=${page}&limit=${limit}`);
  return response.data; // { data: Card[], total, page, limit }
};

export const getCard = async (id: number) => {
  const response = await api.get(`/card/${id}`);
  return response.data.data[0] as Card; // Single card
};

export const createCard = async (cardData: Omit<Card, 'idCard' | 'userSecret' | 'createdAt' | 'updatedAt'>) => {
  const response = await api.post('/card', cardData);
  return response.data as Card;
};

export const updateCard = async (id: number, updates: Partial<Card>) => {
  const response = await api.patch(`/card/${id}`, updates);
  return response.data as Card;
};

export const deleteCard = async (id: number) => {
  await api.delete(`/card/${id}`);
};