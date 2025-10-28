// Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-links-grid">
          <div className="footer-col">
            <h3>Products</h3>
            <ul>
              <li><a href="/mac">Mac</a></li>
              <li><a href="/ipad">iPad</a></li>
              <li><a href="/iphone">iPhone</a></li>
              <li><a href="/watch">Watch</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/news">Newsroom</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/sitemap">Site Map</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <p>© 2025 TicketApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
