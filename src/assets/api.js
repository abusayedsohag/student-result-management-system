import axios from 'axios';

// Correct Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_LINK,
});

export const createStudent = (data) => API.post('/students', data);
export const updateStudent = (roll, data) => API.put(`/students/${roll}`, data);

export const fetchStudents = () => API.get('/students');
export const fetchStudent = (roll) => API.get(`/students/${roll}`);

export const fetchCourses = () => API.get('/courses');
export const fetchCourse = (coursename) => API.get(`/courses/${coursename}`);

export const fetchInstitutes = () => API.get('/institutes');