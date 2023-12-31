import { useContext } from "react";
import "./Toggle.css";
import { ThemeContext } from "../../context/ThemeContext";

const Toggle = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="toggle">
      <label className="switch" htmlFor="theme-toggle">
        <input
          id="theme-toggle"
          aria-label="Dark Mode Toggle"
          type="checkbox"
          checked={theme.isDarkTheme}
          onChange={theme.toggleTheme}
        />
        <span className="slider">
          <svg
            className="toggle-night"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="30px"
            height="30px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z" />
          </svg>
          <svg
            className="toggle-day"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="30px"
            height="30px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
          </svg>
        </span>
      </label>
    </div>
  );
};

export default Toggle;
