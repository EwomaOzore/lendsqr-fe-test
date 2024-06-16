import axios from 'axios';

const API_URL = 'https://run.mocky.io/v3/1af640a7-f83b-444a-99db-f81b4491e2d7';

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};