import React from 'react';
import {Link} from 'gatsby';

const Card = ({title, link, children}) => {
	return (
		<div className='w-100 w-50-m w-third-l dib'>
			<Link to={link} className='link black'>
				<div className='dim outline pa3 ma2-l ma2-m mb3'>
					<h5>{title}</h5>
					{children}
				</div>
			</Link>
		</div>
	);
};

export default Card;
