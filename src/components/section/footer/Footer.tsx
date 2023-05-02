import React from "react";
import "./footer.scss";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <ul className="footer__container__sectioning">
          <li className="footer__container__list">Visit us at</li>
          <li className="footer__container__list">Nekvägen 23 </li>
          <li className="footer__container__list">156 79 Stockholm</li>
        </ul>
        <ul className="footer__container__sectioning">
          <li className="footer__container__list">Phone 076-123 45 67</li>
          <li className="footer__container__list mail">
            Mail: kontakt@ITALIANO ROM.com
          </li>
        </ul>
        <ul className="footer__container__column">
          <li className="footer__container__column__icon">
            <FaFacebook />
          </li>
          <li className="footer__container__column__icon">
            <FaLinkedin />
          </li>
          <li className="footer__container__column__icon">
            <FaInstagram />
          </li>
        </ul>
      </div>
    </div>
  );
};
