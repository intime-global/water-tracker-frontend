import axios from 'axios';

const api = axios.create({
    baseURL: 'https://intime-water-tracker.onrender.com/api',
  });

export const addWater = async (body, token) => {
    const { data } = await api.post('/Water/', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

export const getWaterToday = async (_,token) => {
    const { data } = await api.get('/Water/today', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

export const deleteWater = async (token, id) => {
    const { data } = await api.delete(`/Water/${id}`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

export const editWater = async (token, body) => {
    const { data } = await api.patch(`/Water/${body.id}`, {
      amount: body.amount,
      date: body.date
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
