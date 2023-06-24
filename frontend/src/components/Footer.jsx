/* eslint-disable no-unused-vars */
import React from 'react'
import Logo from '../img/logo2.png'

import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="my logo" />
      <section className='social_icons'>
        <FaFacebookF />
        <FaTwitter />

        <FaGoogle />
        <FaInstagram />

        <FaLinkedin />
        <FaGithub />
      </section>

      <p>
        © 2023 Samuel
      </p>
    </footer>
  );
};

export default Footer;
