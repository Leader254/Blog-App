import "../css/LeftSideBar.css";
import { IoCarSportSharp } from "react-icons/io5"; // Cars
import { MdScience } from "react-icons/md"; // Science
import { GrTechnology } from "react-icons/gr"; // Technology
import { BiCodeAlt, BiSolidPlanet, BiCameraMovie } from "react-icons/bi"; // Programming
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <>
      <aside className="leftBar">
        <nav className="leftBar__menu">
          <ul style={{ listStyle: "none" }}>
            <li>
              <Link className="link2" to={"/?category=cars"}>
                <h6><IoCarSportSharp style={{ color: "black", fontSize: "30px" }} />CARS</h6>
              </Link>
              <Link className="link2" to={"/?category=science"}>
                <h6>< MdScience style={{ color: "blue", fontSize: "30px" }} />SCIENCE</h6>
              </Link>
              <Link className="link2" to={"/?category=technology"}>
                <h6><GrTechnology style={{ color: "red", fontSize: "30px" }} />TECHNOLOGY</h6>
              </Link>
              <Link className="link2" to={"/?category=programming"}>
                <h6><BiCodeAlt style={{ color: "red", fontSize: "30px" }} />PROGRAMMING</h6>
              </Link>
              <Link className="link2" to={"/?category=travel"}>
                <h6><BiSolidPlanet style={{ color: "black", fontSize: "30px" }} />TRAVEL</h6>
              </Link>
              <Link className="link2" to={"/?category=movies"}>
                <h6><BiCameraMovie style={{ color: "black", fontSize: "30px" }} /> Movies</h6>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default LeftSidebar;