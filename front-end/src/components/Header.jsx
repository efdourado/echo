import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHouseFloodWater,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();


    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="nav-buttons">
            <Link to="/" className={`btn-ic ${location.pathname === "/" ? "active" : ""}`}>
              <FontAwesomeIcon icon={faHouseFloodWater} />
            </Link>
          </div>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </form>
        </div>


        <div className="header-right">

          
          {/* <Link to="/help" className="btn-home">
              <FontAwesomeIcon icon={faQuestion} />
          </Link> */}

          <Link to="/login" className="btn-login">
            Log In
          </Link>

        </div>


      </div>
    </header>
); };

export default Header;