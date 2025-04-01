import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className={`toggle-btn ${isCollapsed ? "" : "red"}`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FontAwesomeIcon icon={faBarsStaggered} />
      </button>
      
      <nav>
        <Link to="/" className="nav-item">
          <span className="text">Home</span>
        </Link>
        <Link to="/artists" className="nav-item">
          <span className="text">Discover</span>
        </Link>
        <Link to="/songs" className="nav-item">
          <span className="icon">-</span>
          <span className="text">Studio</span>
        </Link>
      </nav>
    </aside>
); };

export default Sidebar;