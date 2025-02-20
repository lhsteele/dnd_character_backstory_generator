import { FunctionComponent } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header: FunctionComponent = () => {
  return (
    <div>
      <header className="page-header ">
        <h1>D&D Character Generator</h1>
      </header>
      <div className="header-buttons-container">
        <div className="navigation-button-container">
          <span className="material-symbols-outlined">stat_0</span>
          <Link to="/character" className="header-button">
            Character backstory
          </Link>
        </div>
        <div className="navigation-button-container">
          <span className="material-symbols-outlined">stat_0</span>
          <Link to="/monsters" className="header-button">
            Monster encounter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
