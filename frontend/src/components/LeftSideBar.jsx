import "./LeftSideBar.css";
import { IoCarSportSharp } from "react-icons/io5"; // Cars
import { MdScience } from "react-icons/md"; // Science
import { GrTechnology } from "react-icons/gr"; // Technology
import { BiCodeAlt, BiSolidPlanet, BiCameraMovie } from "react-icons/bi"; // Programming
import { IoLogoTwitter, IoLogoFacebook, IoLogoGithub } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <>
      <aside className="leftBar">
        <nav className="leftBar__menu">
          <ul style={{ listStyle: "none" }}>
            <li>
              <Link className="link2" to={"/?cat=cars"}>
                <h6><IoCarSportSharp style={{ color: "black", fontSize: "30px" }} />CARS</h6>
              </Link>
              <Link className="link2" to={"/?cat=science"}>
                <h6>< MdScience style={{ color: "blue", fontSize: "30px" }} />SCIENCE</h6>
              </Link>
              <Link className="link2" to={"/?cat=technology"}>
                <h6><GrTechnology style={{ color: "red", fontSize: "30px" }} />TECHNOLOGY</h6>
              </Link>
              <Link className="link2" to={"/?cat=programming"}>
                <h6><BiCodeAlt style={{ color: "red", fontSize: "30px" }} />PROGRAMMING</h6>
              </Link>
              <Link className="link2" to={"/?cat=travel"}>
                <h6><BiSolidPlanet style={{ color: "black", fontSize: "30px" }} />TRAVEL</h6>
              </Link>
              <Link className="link2" to={"/?cat=movies"}>
                <h6><BiCameraMovie style={{ color: "black", fontSize: "30px" }} /> Movies</h6>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="socials">
          <a href="/twitter">
            <i>
              <IoLogoTwitter style={{ color: "blue", fontSize: "30px" }} />
            </i>
          </a>
          <a href="/github">
            <i>
              <IoLogoGithub style={{ color: "black", fontSize: "30px" }} />
            </i>
          </a>
          <a href="/instagram">
            <i>
              <RiInstagramFill style={{ color: "red", fontSize: "30px" }} />
            </i>
          </a>
          <a href="/facebook">
            <i>
              <IoLogoFacebook style={{ color: "black", fontSize: "30px" }} />
            </i>
          </a>

        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;