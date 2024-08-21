import React from 'react';
import { FaBars, FaShoppingCart,FaUser} from 'react-icons/fa';
import logo from "../icons/letter-s.png"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

function Header() {

  const {cartItems}=useSelector((state)=>state.cart);

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        <div className="text-2xl font-bold text-custom-gold">
            <Link to="/"><span className='flex justify-center items-center gap-1'><img src={logo}  className='w-6 h-6' alt='icon'/><p className='font-compadre'>Shopper</p></span></Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/cart" className="text-white hover:text-custom-gold">
          <span className='flex justify-center items-center gap-1'><FaShoppingCart/><p>cart{cartItems.length>0 && <sup className='text-custom-gold'>{cartItems.reduce((acc,element)=>acc+element.qty,0)}</sup>}</p></span>
          </Link>
          <Link to="/signin" className="text-white hover:text-custom-gold">
            <span className='flex justify-center items-center gap-1'><FaUser/><p>Sign in</p></span>
          </Link>
        </nav>
        <div className="flex md:hidden">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="text-white hover:text-custom-gold focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;