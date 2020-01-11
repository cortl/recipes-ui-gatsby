import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Img from 'gatsby-image';

const SECTION_STYLE = 'w-80-l center';

const notes = ({notes}) =>
	notes.filter(Boolean).length ? (
		<section className={SECTION_STYLE}>
			<h2>{`Notes`}</h2>
			<ul>
				{notes.map((note, i) => (
					<li className='pv2' key={`notes${i}`}>
						{note}
					</li>
				))}
			</ul>
		</section>
	) : (
		<></>
	);

const ingredients = ({ingredients}) => (
	<section className={SECTION_STYLE}>
		<h2>{`Ingredients`}</h2>
		<ul>
			{ingredients.map((ingredient, i) => (
				<li className='pv2' key={`${i}ingredient`}>
					{ingredient}
				</li>
			))}
		</ul>
	</section>
);

const instructions = ({instructions}) => (
	<section className={SECTION_STYLE}>
		<h2>{`Instructions`}</h2>
		<ol>
			{instructions.map((instruction, i) => (
				<li className='pv2' key={`instruction${i}`}>
					<span className='lh-copy'>{instruction}</span>
				</li>
			))}
		</ol>
	</section>
);

const Recipe = ({data, pageContext}) => {
	const HALF = 'w-100 w-50-l dib v-mid';
	return (
		<Layout>
			<SEO title={pageContext.title} />
			<section className={SECTION_STYLE}>
				<div className={`${HALF}`}>
					<h1 className='lh-title'>{`${pageContext.title} - ${pageContext.rating}/10`}</h1>
					<h4>
						{`Adapted from `}
						<a className='black dim' href={pageContext.source}>
							here
						</a>
					</h4>
				</div>
				<div className={HALF}>
					{data.placeholderImage && (
						<Img fluid={data.placeholderImage.childImageSharp.fluid} />
					)}
				</div>
			</section>
			{notes(pageContext)}
			{ingredients(pageContext)}
			{instructions(pageContext)}
		</Layout>
	);
};

export const query = graphql`
	query($image: String) {
		placeholderImage: file(relativePath: {eq: $image}) {
			childImageSharp {
				fluid(maxWidth: 960, maxHeight: 960) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;

export default Recipe;
