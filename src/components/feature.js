import React from 'react';
import {Link} from 'gatsby';
import Img from 'gatsby-image';

export const Feature = ({title, rating, slug, image}) => {
	return (
		<article className='pa2 w-100 w-50-m w-25-l dib'>
			<div className='br2 ba b--black-10'>
				{image ? (
					<Img
						placeholderClassName='db ws-100 br2 br--top'
						className='db w-100 br2 br--top'
						fluid={image.childImageSharp.fluid}
					/>
				) : (
					<div className='db ws-100 br2 br--top h1 bg-light-red h3' />
				)}
				<div className='pa2 ph3-ns pb3-ns'>
					<div className='dt w-100 mt1'>
						<div className='dtc'>
							<Link to={`/recipes/${slug}/`} className='link black'>
								<h1 className='f5 f4-ns mv0 dim'>{title}</h1>
							</Link>
						</div>
						<div className='dtc tr'>
							<h2 className='f5 mv0'>{`Rating ${rating}/10`}</h2>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};
