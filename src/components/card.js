import React from "react"

import "./card.css"
import { Link } from "gatsby"

const Card = ({ title, link, children }) => {
    return (
        <Link to={link}>
            <div className='card'>
                <h5>{title}</h5>
                {children}
            </div>
        </Link>
    );
}

export default Card