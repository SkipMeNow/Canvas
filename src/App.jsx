import React, { useContext } from "react";
import { ThemeContext } from "./context/themeContext";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app-grid">
      <header className="topbar">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
      </header>
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Dashboard</li>
          <li>Settings</li>
          <li>Profile</li>
        </ul>
      </aside>
      <main className="main-content">
        <p>Welcome to your dashboard. Scroll to see layout in action.</p>
        {/* <div style={{ height: "1500px" }}></div> */}
      </main>
    </div>
  );
};

export default App;
