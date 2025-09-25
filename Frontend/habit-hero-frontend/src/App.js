import { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import MyCalendar from "./components/MyCalendar";
import { getHabits } from "./api/habitApi";

function App() {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const response = await getHabits();
    setHabits(response.data);
  };

  useEffect(() => {
    fetchHabits();
  }, [updateFlag]);

  return (
    <div>
      <h1>Habit Hero</h1>
      <AddHabitForm onHabitAdded={() => setUpdateFlag(!updateFlag)} />
      <HabitList key={updateFlag} />
      <MyCalendar habits={habits} /> {/* pass habits here */}
    </div>
  );
}

export default App;
