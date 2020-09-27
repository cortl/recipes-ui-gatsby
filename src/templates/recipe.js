import React, {useState, Fragment} from 'react';
import {graphql} from 'gatsby';
import Img from 'gatsby-image';

import 'tachyons-sass/tachyons.scss';

import SEO from '../components/seo';

const ingredients = ({ingredients}) =>
	ingredients.map(ingredientSet => (
		<Fragment key={ingredientSet.category}>
			{ingredients.length > 1 && (
				<h4 className='mv0'>{ingredientSet.category}</h4>
			)}
			<ul className='list pl0 mt0'>
				{ingredientSet.items.map((ingredient, i) => {
					const [completed, setIngredientCompleted] = useState(false);
					return (
						<li
							className='lh-copy pv1 ba bl-0 bt-0 br-0 b--dotted b--black-30'
							onClick={() => setIngredientCompleted(completed => !completed)}
							key={`${i}ingredient`}
						>
							<span className={`${completed ? 'strike' : ''}`}>
								{ingredient}
							</span>
						</li>
					);
				})}
			</ul>
		</Fragment>
	));

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

const Recipe = ({data, pageContext, location}) => {
	return (
		<div className='helvetica center mw8'>
			<SEO title={pageContext.title} />
			<header className='f1 lh-solid fw8 pb4 pt4 tc'>
				{pageContext.title}
			</header>
			<article className='ph2 ph2-m ph0-l'>
				<section className='shadow-3 br4 pb2'>
					{data.allRecipesJson.nodes[0].image && (
						<Img
							placeholderClassName='w-100'
							className='w-100 br4 br--top'
							style={{height: '25em'}}
							imgStyle={{height: '25em'}}
							fluid={data.allRecipesJson.nodes[0].image.childImageSharp.fluid}
						/>
					)}
					<div className='fr ph2-ns cf'>
						<div className='pr4 pt4'>
							<a
								href={location.pathname}
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Share'
								className='pa2'
							>
								<i className='gg-share black dim' />
							</a>
						</div>
					</div>
					<div className='cf ph2-ns'>
						<div className='fl w-100 w-50-ns pa2'>
							<div>
								<h3>{'Details'}</h3>
								<p>
									<strong>{'Rating: '}</strong>
									{`${pageContext.rating}/10`}
								</p>
								<p>
									<strong>{'Serves: '}</strong>
									{pageContext.servings}
								</p>
								{pageContext.createdDate && (
									<p>
										<strong>{'Made on: '}</strong>
										{pageContext.createdDate}
									</p>
								)}
								<p>
									<strong>{'Notes: '}</strong>
									{pageContext.notes}
								</p>
								<a className='b link dim black-90' href={pageContext.source}>
									{'Original Source'}
								</a>
							</div>
						</div>
						<div className='fl w-100 w-40-ns pa2'>
							<div>
								<h3>{'Time'}</h3>
								{pageContext.time.map(({label, units}, i) => (
									<p key={i}>
										<strong>{`${label}: `}</strong>
										{units}
									</p>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className='shadow-3 br4 mt4'>
					<div className='cf ph2-ns'>
						<div className='fl w-100 w-30-ns pa2'>
							<h2>{'Ingredients'}</h2>
							{ingredients(pageContext)}
						</div>
						<div className='fl w-100 w-70-ns pa2'>
							<h2>{'Instructions'}</h2>
							{instructions(pageContext)}
						</div>
					</div>
				</section>
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
