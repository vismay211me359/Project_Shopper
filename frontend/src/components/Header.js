import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from "../icons/letter-s.png"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileDropdown from './ProfileDropDown';
import MobileNav from './MobileNav';
import SearchBox from './SearchBox';

function Header() {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        <div className="text-2xl font-bold text-custom-gold">
          <Link to="/"><span className='flex justify-center items-center gap-1'><img src={logo} className='w-6 h-6' alt='icon' /><p className='font-compadre'>Shopper</p></span></Link>
        </div>
        <div className='hidden md:flex justify-center items-center gap-5'>
          <SearchBox/>
          <nav className="hidden md:flex space-x-6">
            <Link to="/cart" className="text-white hover:text-custom-gold">
              <span className='flex justify-center items-center gap-1'><FaShoppingCart /><p>cart{cartItems.length > 0 && <sup className='text-custom-gold'>{cartItems.reduce((acc, element) => acc + element.qty, 0)}</sup>}</p></span>
            </Link>
            {userInfo ? (<ProfileDropdown></ProfileDropdown>) : (<Link to="/login" className="text-white hover:text-custom-gold">
              <span className='flex justify-center items-center gap-1'><FaUser /><p>Sign in</p></span>
            </Link>)}
          </nav>
        </div>
        <div className="flex md:hidden">
          <MobileNav theSize={'3xl'}/>
        </div>
      </div>
    </header>
  );
}

export default Header;