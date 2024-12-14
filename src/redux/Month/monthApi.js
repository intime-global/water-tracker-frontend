import axios from 'axios';

const api = axios.create({
  baseURL: 'https://intime-water-tracker.onrender.com/api',
});

export const getWaterMonth = async (token, date) => {
  const { data } = await api.get(`/water/month?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
