/* eslint-disable no-unused-vars */
import React from 'react'
import Logo from '../img/logo2.png'
import { IoLogoTwitter, IoLogoFacebook, IoLogoGithub } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import '../css/Footer.css'

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="my logo" />
      <section className='social_icons' style={{display: "flex", gap: "30px"}}>
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
      </section>

      <p>
        © 2023 Samuel
      </p>
    </footer>
  );
};

export default Footer;
