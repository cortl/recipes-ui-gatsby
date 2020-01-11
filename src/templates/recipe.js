import React from 'react';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Img from 'gatsby-image';

const SECTION_STYLE = 'bb w-80-l center';

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
	return (
		<Layout>
			<SEO title={pageContext.title} />
			<h1 className='lh-title'>{`${pageContext.title} - ${pageContext.rating}/10`}</h1>
			<h4>
				{`Adapted from `}
				<a className='black dim' href={pageContext.source}>
					here
				</a>
			</h4>
			{data.placeholderImage && (
				<div className='h-25-l'>
					<Img fluid={data.placeholderImage.childImageSharp.fluid} />
				</div>
			)}
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
				fluid(maxWidth: 960, maxHeight: 400) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;

export default Recipe;
