import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import { useState } from "react";

function App() {
  const [updateFlag, setUpdateFlag] = useState(false);

  return (
    <div>
      <h1>Habit Hero</h1>
      <AddHabitForm onHabitAdded={() => setUpdateFlag(!updateFlag)} />
      <HabitList key={updateFlag} />
    </div>
  );
}

export default App;