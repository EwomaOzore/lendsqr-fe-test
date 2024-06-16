import axios from 'axios';

const API_URL = 'https://run.mocky.io/v3/e23f44a0-ab98-4b96-8ed8-83b88952868c';

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};