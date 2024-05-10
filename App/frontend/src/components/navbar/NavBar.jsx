import { Link } from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";

const Navbar = () => {
  return (
    <header className="app-nav">

      <h1 className="logo">Strength Studio</h1>
      <nav>
            <Link to="/">Home</Link>
            <Link to="/classes">Classes</Link>
            <Link to="/members">Members</Link>
            <Link to="/instructors">Instructors</Link>
            <Link to="/schedules">Schedules</Link>
      </nav>
    </header>
  );
};

export default Navbar;
