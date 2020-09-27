import React from 'react';
import {Link} from 'gatsby';
import Img from 'gatsby-image';

import NoImage from '../components/no-image';

const imageClassName = 'db h5 h-75-l br4 br--top';
const placeHolderClassName = 'db br4 br--top';

export const Feature = ({title, rating, slug, image}) => {
	return (
		<Link to={`/recipes/${slug}/`} className='link black'>
			<article className='pa2 w-100 w-50-m w5-l dib'>
				<div className='br4 shadow-3'>
					{image ? (
						<Img
							placeholderClassName={placeHolderClassName}
							className={imageClassName}
							fluid={image.childImageSharp.fluid}
						/>
					) : (
						<NoImage
							placeholderClassName={placeHolderClassName}
							className={imageClassName}
						/>
					)}
					<div className='pa2 ph3 pb3'>
						<div className='dt w-100 mt1'>
							<div className='dtc'>
								<h1 className='f5 f4-ns mv0'>{title}</h1>
							</div>
							<div className='dtc tr'>
								<h2 className='f5 mv0'>{`Rating ${rating}/10`}</h2>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
};
