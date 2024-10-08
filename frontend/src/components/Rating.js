import React from 'react'
import {FaStar,FaStarHalfAlt, FaRegStar} from "react-icons/fa"

const Rating = ({value,text}) => {
  return (
    <div className='flex flex-row items-center gap-3'>
        <div className='flex flex-row text-custom-gold'>  
            <span>
                {value>=1 ? <FaStar/> : value>=0.5 ? <FaStarHalfAlt/> :<FaRegStar/>}
            </span>
            <span>
                {value>=2 ? <FaStar/> : value>=1.5 ? <FaStarHalfAlt/> :<FaRegStar/>}
            </span>
            <span>
                {value>=3 ? <FaStar/> : value>=2.5 ? <FaStarHalfAlt/> :<FaRegStar/>}
            </span>
            <span>
                {value>=4 ? <FaStar/> : value>=3.5 ? <FaStarHalfAlt/> :<FaRegStar/>}
            </span>
            <span>
                {value>=5 ? <FaStar/> : value>=4.5 ? <FaStarHalfAlt/> :<FaRegStar/>}
            </span>
        </div>
        <span>{text && text}</span>
    </div>
  )
}

export default Rating
