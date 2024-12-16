import { axiosInstance } from '../../services/axios.config.js';

[...]

const response = await axiosInstance.patch('/user/', data);

export const getWaterMonth = async (token, date) => {
  const { data } = await api.get(`/water/month?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
