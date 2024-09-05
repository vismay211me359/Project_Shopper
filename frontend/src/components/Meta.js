import React from 'react';
import {Helmet} from "react-helmet-async";


const Meta = ({title,description,keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps={
    title:"Welcome to Shopper",
    description:"we sell the best products",
    keywords:"electronics,buy products,cheap,phones,gadets",
};

export default Meta
