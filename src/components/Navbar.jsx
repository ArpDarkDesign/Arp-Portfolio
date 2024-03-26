import { NavLink } from "react-router-dom";
import "../components/Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <header className="header dark-theme py-4 px-8">
      <NavLink to="/" className="brand-logo">
        <p className="brand-text">
          Arp<span className="glow-effect">Arp</span>
        </p>
      </NavLink>
      <nav className="nav-links">
        <NavLink to="/about" className="nav-link" activeclassname="active-link">
          About
        </NavLink>
        <NavLink
          to="/projects"
          className="nav-link ml-10"
          activeclassname="active-link"
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
