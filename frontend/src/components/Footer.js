import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import {Link} from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-black text-white">
          <div className="py-2 border-b border-gray-700 grid grid-cols-2">
            <p className='justify-self-center'>Get connected with us on social networks :</p>
            <div className="container mx-auto px-4 flex justify-center space-x-6">
              <Link to="/" className="hover:text-custom-gold" aria-label="Facebook">
                <FaFacebookF size={20} />
              </Link>
              <Link to="/" className="hover:text-custom-gold" aria-label="Twitter">
                <FaTwitter size={20} />
              </Link>
              <Link to="/" className="hover:text-custom-gold" aria-label="Instagram">
                <FaInstagram size={20} />
              </Link>
              <Link to="/" className="hover:text-custom-gold" aria-label="LinkedIn">
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>
    
          {/* Second Row: Footer Links */}
          <div className="py-8 pl-32">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Column 1 */}
              <div>
                <h3 className="text-lg font-bold text-custom-gold">About Us</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/" className="hover:text-custom-gold">Our Story</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Mission & Vision</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Team</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Careers</Link></li>
                </ul>
              </div>
    
              {/* Column 2 */}
              <div>
                <h3 className="text-lg font-bold text-custom-gold">Services</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/" className="hover:text-custom-gold">Consulting</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Development</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Design</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Marketing</Link></li>
                </ul>
              </div>
    
              {/* Column 3 */}
              <div>
                <h3 className="text-lg font-bold text-custom-gold">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/" className="hover:text-custom-gold">Help Center</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">FAQs</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Contact Us</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Live Chat</Link></li>
                </ul>
              </div>
    
              {/* Column 4 */}
              <div>
                <h3 className="text-lg font-bold text-custom-gold">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/" className="hover:text-custom-gold">Privacy Policy</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Terms of Service</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Cookie Policy</Link></li>
                  <li><Link to="/" className="hover:text-custom-gold">Disclaimer</Link></li>
                </ul>
              </div>
    
            </div>
          </div>
          <div className='py-8 pr-8 flex flex-row justify-center'>
            <p>© {new Date().getFullYear()} SHOOPER. All rights reserved.</p>
          </div>
        </footer>
      );
}

export default Footer
