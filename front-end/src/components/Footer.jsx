import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faPinterest,
  faYoutube,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";

import logo from "../assets/logo/logoD.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="brand-section">
            <div className="logo-wrapper">
              <img src={logo} alt="logo" className="footer-logo" />
            </div>
            <p className="brand-tagline">Your art speaks for your voice — and sometimes, through it</p>
            <div className="social-links">
              {[faInstagram, faTiktok, faPinterest, faYoutube, faReddit].map(
                (icon, index) => (
                  <a key={index} href="#" className="social-link">
                    <FontAwesomeIcon icon={icon} className="social-icon" />
                  </a>
              ))}
            </div>
          </div>

          <div className="nav-sections"> {[ {
                title: "Explore",
                links: ["About Us", "Site Map", "Help Center", "Report a Bug", "FAQs", "Contact Us"],
              }, {
                title: "Content",
                links: ["Tips", "Interviews", "Behind-the-Scenes", "Diaries", "Events"],
              }, {
                title: "Community",
                links: ["Guidelines", "Collaboration", "Meetups", "Forums", "Voting", "Challenges"],
              },
            ].map(({ title, links }) => (
              <div key={title} className="nav-group">
                <h5 className="nav-title">{title}</h5>
                <div className="nav-links">
                  {links.map((link) => (
                    <a key={link} className="nav-link">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="newsletter-section">
            <h5 className="newsletter-title">Stay Connected</h5>
            <form className="newsletter-form">
              <input type="email" placeholder="Email address" className="email-input" />
              <button type="submit" className="submit-button">
                <span className="button-text">Subscribe</span>
                <span className="button-arrow">→</span>
              </button>
            </form>
            <div className="legal-links">
              {["Privacy", "Cookies", "Terms & Conditions"].map((item) => (
                <a key={item} href="#" className="legal-item">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="copyright-bar">
          <span className="copyright-text">&copy; 2025. All rights reserved.</span>
          <span className="copyright-text">Designed by dudupizzas</span>
        </div>
      </div>
    </footer>
); };

export default Footer;