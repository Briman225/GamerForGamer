import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000'; // Replace with your API base URL

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createSelection = async (user_id, game_id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/selection`, { user_id, game_id });
    return response.data;
  } catch (error) {
    console.error('Error creating selection:', error);
    throw error;
  }
};
