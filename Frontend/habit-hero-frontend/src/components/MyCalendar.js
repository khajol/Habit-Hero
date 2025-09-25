import React, { useState, useEffect } from "react";
import { getHabits } from "../api/habitApi";
import "./Calendar.css"; // your CSS

export default function MyCalendar() {
  const days = ['S','M','T','W','T','F','S'];
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [habits, setHabits] = useState([]);
  const [habitsForDate, setHabitsForDate] = useState([]);

  // Fetch all habits on mount
  const fetchHabits = async () => {
    try {
      const response = await getHabits();
      setHabits(response.data);
      filterHabitsForDate(selectedDate, response.data); // Show habits for today initially
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Filter habits based on selected date
  const filterHabitsForDate = (date, habitList = habits) => {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const filtered = habitList.filter(habit => {
      const start = new Date(habit.start_date);
      if (date < start) return false;

      switch (habit.frequency) {
        case "daily":
          return true;
        case "weekly":
          const diffDays = Math.floor((date - start)/(1000*60*60*24));
          return diffDays % 7 === 0;
        case "monthly":
          return date.getDate() === start.getDate();
        default:
          return false;
      }
    });
    setHabitsForDate(filtered);
  };

  const getMonthName = (month) => [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ][month];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    let month = currentMonth - 1;
    let year = currentYear;
    if (month < 0) { month = 11; year -= 1; }
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const nextMonth = () => {
    let month = currentMonth + 1;
    let year = currentYear;
    if (month > 11) { month = 0; year += 1; }
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handleDateClick = (date) => {
    const selected = new Date(currentYear, currentMonth, date);
    setSelectedDate(selected);
    filterHabitsForDate(selected);
  };

  const renderCalendarDates = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const cells = [];

    for (let i = 0; i < firstDay; i++) cells.push(<div key={`empty-${i}`}></div>);

    for (let date = 1; date <= totalDays; date++) {
      const isToday = date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      const hasHabit = habits.some(habit => {
        const start = new Date(habit.start_date);
        if (new Date(currentYear, currentMonth, date) < start) return false;
        switch (habit.frequency) {
          case "daily": return true;
          case "weekly":
            const diffDays = Math.floor((new Date(currentYear, currentMonth, date) - start)/(1000*60*60*24));
            return diffDays % 7 === 0;
          case "monthly": return date === start.getDate();
          default: return false;
        }
      });

      cells.push(
        <div
          key={date}
          className={`calendar-date ${isToday ? 'today' : ''} ${hasHabit ? 'has-habit' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {date}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>◀</button>
        <h3>{getMonthName(currentMonth)} {currentYear}</h3>
        <button onClick={nextMonth}>▶</button>
      </div>

      <div className="calendar-grid">
        {days.map((day, idx) => <div key={idx} className="calendar-day">{day}</div>)}
        {renderCalendarDates()}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Habits for {selectedDate.toDateString()}:</h4>
        <ul>
          {habitsForDate.length ? habitsForDate.map(h => <li key={h.id}>{h.name} ({h.category})</li>) :
          <li>No habits</li>}
        </ul>
      </div>
    </div>
  );
}
