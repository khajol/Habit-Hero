import { useState } from "react";
import { addHabit } from "../api/habitApi";

export default function AddHabitForm({ onHabitAdded }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addHabit({ name, frequency, category, start_date: startDate });
      onHabitAdded(response.data);
      setName(""); setCategory(""); setStartDate("");
    } catch (err) {
      console.error(err.response || err);
      alert("Error adding habit" + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Habit name" required />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required />
      <select value={frequency} onChange={e => setFrequency(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      <button type="submit">Add Habit</button>
    </form>
  );
}