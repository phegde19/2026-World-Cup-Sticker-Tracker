import {
    useTheme
  } from "../context/ThemeContext";
  
  export default function ThemeToggle() {
  
    const {
      darkMode,
      setDarkMode
    } = useTheme();
  
    return (
      <button
        onClick={() =>
          setDarkMode(
            !darkMode
          )
        }
        style={{
          border: "none",
          borderRadius: "8px",
          padding: "10px",
          cursor: "pointer"
        }}
      >
        {darkMode
          ? "☀️"
          : "🌙"}
      </button>
    );
  }