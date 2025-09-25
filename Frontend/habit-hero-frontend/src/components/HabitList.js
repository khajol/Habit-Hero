import { useEffect, useState } from "react";
import { getHabits, deleteHabit } from "../api/habitApi";
import "./HabitList.css"; // create a separate CSS file for habit list

export default function HabitList() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const response = await getHabits();
    setHabits(response.data);
  };

  const handleDelete = async (id) => {
    await deleteHabit(id);
    setHabits(habits.filter(h => h.id !== id));
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="habit-list">
      {habits.length ? habits.map(h => (
        <div key={h.id} className="habit-item">
          <div className="habit-info">
            <strong>{h.name}</strong>
            <span className="habit-details">{h.frequency} • {h.category}</span>
            <span className="habit-date">Start: {h.start_date}</span>
          </div>
          <button className="delete-btn" onClick={() => handleDelete(h.id)}>Delete</button>
        </div>
      )) : <p>No habits yet!</p>}
    </div>
  );
}
