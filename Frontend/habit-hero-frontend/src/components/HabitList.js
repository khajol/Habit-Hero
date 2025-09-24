import { useEffect, useState } from "react";
import { getHabits, deleteHabit } from "../api/habitApi";

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
    <div>
      {habits.map(h => (
        <div key={h.id}>
          <strong>{h.name}</strong> ({h.frequency} - {h.category}) - {h.start_date}
          <button onClick={() => handleDelete(h.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}