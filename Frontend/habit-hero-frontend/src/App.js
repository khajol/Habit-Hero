import { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import MyCalendar from "./components/MyCalendar";
import { getHabits } from "./api/habitApi";
import "./App.css";  // <-- import App.css here

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
    <div className="dashboard">
      <header>
        <h1>Habit Hero</h1>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <AddHabitForm onHabitAdded={() => setUpdateFlag(!updateFlag)} />
        </div>

        <div className="right-panel">
          <HabitList key={updateFlag} />
          <MyCalendar habits={habits} />
        </div>
      </div>
    </div>
  );
}

export default App;
