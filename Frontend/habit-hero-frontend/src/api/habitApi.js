import axios from "axios";

const BASE_URL = "http://127.0.0.1:8001/api/habits";

export const getHabits = () => axios.get(BASE_URL);
export const addHabit = (habit) => axios.post(BASE_URL, habit);
export const deleteHabit = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateHabit = (id, habit) => axios.put(`${BASE_URL}/${id}`, habit);