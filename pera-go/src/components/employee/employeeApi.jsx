import axios from 'axios';

const API_URL = 'https://6583de3b4d1ee97c6bce6c82.mockapi.io/employee';


export async function getEmployees() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Employees:', error);
    throw new Error('Failed to retrieve Employees');
  }
}

export async function createEmployee(data) {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Employee:', error);
    throw new Error('Failed to create Employee');
  }
}

export async function updateEmployee(id, data) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Employee:', error);
    throw new Error('Failed to update Employee');
  }
}

export async function deleteEmployee(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting Employee:', error);
    throw new Error('Failed to delete Employee');
  }
}