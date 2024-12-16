import { axiosInstance } from '../../services/axios.config.js';

const response = await axiosInstance.patch('/user/', data);

export const deleteWater = async (token, id) => {
    const { data } = await axiosInstance.delete(`/water/${id}`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  export const editWater = async (token, body) => {
    const { data } = await api.patch(`/water/${body.id}`, {
      amount: body.amount,
      date: body.date
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
