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
        <Link to="/character" className="header-button">
          Generate character backstory
        </Link>
        <span className="material-symbols-outlined">diamond</span>
        <Link to="/monsters" className="header-button">
          Generate monster encounter
        </Link>
      </div>
    </div>
  );
};

export default Header;
