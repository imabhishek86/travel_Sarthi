import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark dark:bg-gray-950 text-white pt-16 pb-8 border-t border-gray-100/10 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">✈️</span> TravelSaarthi
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your ultimate travel companion. Discover new destinations, book luxury hotels, and find the perfect travel packages for your next adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/destinations" className="text-gray-400 hover:text-primary transition-colors text-sm">Destinations</Link></li>
              <li><Link to="/hotels" className="text-gray-400 hover:text-primary transition-colors text-sm">Hotels</Link></li>
              <li><Link to="/packages" className="text-gray-400 hover:text-primary transition-colors text-sm">Travel Packages</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">📍</span>
                <span>Punjab, India</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">📞</span>
                <span>+91 6204859723</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">✉️</span>
                <span>abhi32348@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TravelSaarthi. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">FB</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">TW</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
