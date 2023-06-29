import "../css/LeftSideBar.css";
import { IoCarSportSharp } from "react-icons/io5"; // Cars
import { MdScience } from "react-icons/md"; // Science
import { GrTechnology } from "react-icons/gr"; // Technology
import { BiCodeAlt, BiSolidPlanet, BiCameraMovie } from "react-icons/bi"; // Programming

const LeftSidebar = () => {
  return (
    <>
      <aside className="leftBar">
        <nav className="leftBar_menu">
          <h4>Blogs on Different Categories</h4>
          <ul style={{ listStyle: "none" }}>
            <li>
              <span className="link2">
                <h6><IoCarSportSharp style={{ color: "black", fontSize: "30px" }} />CARS</h6>
              </span>
              <span className="link2">
                <h6>< MdScience style={{ color: "blue", fontSize: "30px" }} />SCIENCE</h6>
              </span>
              <span className="link2">
                <h6><GrTechnology style={{ color: "red", fontSize: "30px" }} />TECHNOLOGY</h6>
              </span>
              <span className="link2">
                <h6><BiCodeAlt style={{ color: "red", fontSize: "30px" }} />PROGRAMMING</h6>
              </span>
              <span className="link2">
                <h6><BiSolidPlanet style={{ color: "black", fontSize: "30px" }} />TRAVEL</h6>
              </span>
              <span className="link2">
                <h6><BiCameraMovie style={{ color: "black", fontSize: "30px" }} /> Movies</h6>
              </span>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default LeftSidebar;
