import React, {useState} from 'react';
import {graphql} from 'gatsby';
import 'tachyons-sass/tachyons.scss';

import SEO from '../components/seo';
import Image from '../components/image';
import BackgroundImage from 'gatsby-background-image';

const ingredients = ({ingredients}) => (
	<ul className='list pl0'>
		{ingredients.map((ingredient, i) => {
			const [completed, setIngredientCompleted] = useState(false);
			return (
				<li
					className='lh-copy pv1 ba bl-0 bt-0 br-0 b--dotted b--black-30'
					onClick={() => setIngredientCompleted(completed => !completed)}
					key={`${i}ingredient`}
				>
					<span className={`${completed ? 'strike' : ''}`}>{ingredient}</span>
				</li>
			);
		})}
	</ul>
);

const instructions = ({instructions}) => (
	<ol className='list pl0'>
		{instructions.map((instruction, i) => {
			const [completed, setInstructionCompleted] = useState(false);

			return (
				<li className='pv1 lh-copy' key={`instruction${i}`}>
					<h3 className='mv0 b'>{`Step ${i + 1}`}</h3>
					<p
						onClick={() => setInstructionCompleted(completed => !completed)}
						className={`mv0 ${completed ? 'strike' : ''}`}
					>
						{instruction}
					</p>
				</li>
			);
		})}
	</ol>
);

const buildDefinitions = definitions =>
	definitions.map((definition, i) =>
		buildDefinition(definition.key, definition.value, i === 0)
	);
const buildDefinition = (key, value, isFirst) => (
	<React.Fragment key={`dt${key}`}>
		<dt className={`b ${isFirst ? '' : 'mt2'} `}>{key}</dt>
		<dd className={`ml0`}>{value}</dd>
	</React.Fragment>
);
const details = ({source, notes, rating}) => (
	<dl className=''>
		{buildDefinitions([
			{key: 'Rating', value: `${rating}/10`},
			{
				key: 'Source',
				value: (
					<a className='link black underline  dim' href={source}>
						{'Here'}
					</a>
				),
			},
			{key: 'Notes', value: notes},
		])}
	</dl>
);

const hero = ({allRecipesJson}, {title, rating}) => {
	const image = allRecipesJson.nodes[0].image;
	const content = () => (
		<>
			<nav className='dt w-100'>
				<div className='dtc pa1'>
					<a className='link dim dib h2' href='/'>
						<Image />
					</a>
				</div>
			</nav>
			<div className='tc-l m43 m43-m mt5-l ph3'>
				<h1 className='f2 f1-l fw2 white-90 mb0 lh-title'>{title}</h1>
				<h2 className='fw1 f3 white-80 mt3 mb4'>{`Rating ${rating}/10`}</h2>
			</div>
		</>
	);
	return (
		<header className='sans-serif'>
			{image ? (
				<BackgroundImage
					Tag='div'
					className={'cover bg-left bg-center-l'}
					fluid={image.childImageSharp.fluid}
					backgroundColor={`#040e18`}
				>
					<div className='bg-black-40 pb5 pb5-m pb5-l'>{content()}</div>
				</BackgroundImage>
			) : (
				<div className={'bg-light-red pb5 pb5-m pb5-l'}>{content()}</div>
			)}
		</header>
	);
};

const Recipe = ({data, pageContext}) => {
	return (
		<div className='sans-serif'>
			<SEO title={pageContext.title} />
			{hero(data, pageContext)}
			<article className='pa4 mx-auto mw7-l center'>
				<h2>Ingredients</h2>
				{ingredients(pageContext)}
				<h2>Instructions</h2>
				{instructions(pageContext)}
				<h2>Details</h2>
				{details(pageContext)}
			</article>
		</div>
	);
};

export const query = graphql`
	query RecipeImage($slug: String) {
		allRecipesJson(filter: {slug: {eq: $slug}}) {
			nodes {
				slug
				title
				rating
				image {
					childImageSharp {
						fluid(maxWidth: 1920, maxHeight: 960) {
							src
						}
					}
				}
			}
		}
	}
`;

export default Recipe;
