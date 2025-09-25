// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Create this CSS file

function Header() {
  return (
    <header className="header">
      <div className="logo">
        {/* Placeholder for Habit Hero logo */}
        <img src="https://via.placeholder.com/30x30/000000/FFFFFF?text=H" alt="Habit Hero Logo" />
        <h1>Habit Hero</h1>
      </div>
      <div className="user-profile">
        {/* User profile icon/dropdown */}
        <img src="https://via.placeholder.com/30x30/CCCCCC/FFFFFF?text=H" alt="User Profile" />
        <span className="dropdown-arrow">▼</span>
      </div>
    </header>
  );
}

export default Header;