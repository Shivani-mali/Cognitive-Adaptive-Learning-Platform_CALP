import axios from 'axios';

const API_URL = '/api';

export const askAi = async (question, context = '', mode = '') => {
  try {
    const response = await axios.post(`${API_URL}/ai/ask`, { question, context, mode });
    return response.data;
  } catch (error) {
    console.error('Error asking AI:', error);
    throw error;
  }
};
