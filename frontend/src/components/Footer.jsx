/* eslint-disable no-unused-vars */
import React from 'react'
import Logo from '../img/logo2.png'
import { IoLogoTwitter,  IoLogoGithub } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaDev } from "react-icons/fa";
import '../css/Footer.css'

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="my logo" />
      <section className='social_icons' style={{display: "flex", gap: "30px"}}>
        <a href="https://twitter.com/samkaka_">
          <i>
            <IoLogoTwitter style={{ color: "blue", fontSize: "30px" }} />
          </i>
        </a>
        <a href="https://github.com/Leader254">
          <i>
            <IoLogoGithub style={{ color: "black", fontSize: "30px" }} />
          </i>
        </a>
        <a href="https://instagram.com/i.ts_samh">
          <i>
            <RiInstagramFill style={{ color: "red", fontSize: "30px" }} />
          </i>
        </a>
        <a href="https://dev.to/samuelwachira">
          <i>
            <FaDev style={{ color: "black", fontSize: "30px" }} />
          </i>
        </a>
      </section>

      <p>
        © 2023 Samuel
      </p>
    </footer>
  );
};

export default Footer;
