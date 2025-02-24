import { FunctionComponent } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

const Header: FunctionComponent = () => {
  const location = useLocation();

  return (
    <div>
      <header className="page-header ">
        <h1>D&D Character Generator</h1>
      </header>
      <div className="header-buttons-container">
        <button className="navigation-button-container">
          {location.pathname.includes("/character") ? (
            <span
              data-testid="character-active-icon"
              className="material-symbols-outlined"
            >
              nearby
            </span>
          ) : (
            <span className="material-symbols-outlined">stat_0</span>
          )}
          <Link
            to="/character"
            className="header-button"
            data-testid="character-link"
          >
            Character backstory
          </Link>
        </button>
        <button className="navigation-button-container">
          {location.pathname.includes("/monster") ? (
            <span
              data-testid="monster-active-icon"
              className="material-symbols-outlined"
            >
              nearby
            </span>
          ) : (
            <span className="material-symbols-outlined">stat_0</span>
          )}
          <Link
            to="/monster"
            className="header-button"
            data-testid="monster-link"
          >
            Monster encounter
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
