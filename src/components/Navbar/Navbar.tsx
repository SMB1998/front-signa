import { FC } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <div className="right-section">
        <div className="button">
          Ayuda
          <FaRegQuestionCircle style={{ marginLeft: "8px", marginTop: 5 }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
