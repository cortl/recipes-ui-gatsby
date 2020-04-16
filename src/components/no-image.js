import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';

const NoImage = ({placeholderClassName, className}) => {
	const data = useStaticQuery(graphql`
		query {
			placeholderImage: file(relativePath: {eq: "no-camera.png"}) {
				childImageSharp {
					fluid(maxHeight: 300) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	return (
		<Img
			placeholderClassName={placeholderClassName}
			className={className}
			style={{
				marginRight: 'auto',
				marginLeft: 'auto',
			}}
			fluid={data.placeholderImage.childImageSharp.fluid}
		/>
	);
};

export default NoImage;
