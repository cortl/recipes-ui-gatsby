import React, {useState, Fragment} from 'react';
import {graphql} from 'gatsby';
import Img from 'gatsby-image';

import 'tachyons-sass/tachyons.scss';

import SEO from '../components/seo';

const ingredients = ({ingredients}) =>
	ingredients.map((ingredientSet, categoryIndex) => (
		<Fragment key={ingredientSet.category}>
			<fieldset className='pl0 bn'>
				{ingredients.length > 1 && (
					<legend className='mv0 b'>{ingredientSet.category}</legend>
				)}
				{ingredientSet.items.map((ingredient, i) => {
					const [completed, setIngredientCompleted] = useState(false);
					return (
						<li
							className='lh-copy pv1 ba bl-0 bt-0 br-0 b--dotted b--black-30 flex items-center'
							key={`${i}ingredient`}
						>
							<input
								onChange={() => setIngredientCompleted(completed => !completed)}
								id={`ingredient-${categoryIndex}-${i}`}
								type='checkbox'
								className='glow o-0'
								checked={completed}
							/>
							<label
								htmlFor={`ingredient-${categoryIndex}-${i}`}
								className={`${completed ? 'strike' : ''}`}
							>
								{ingredient}
							</label>
						</li>
					);
				})}
			</fieldset>
		</Fragment>
	));

const instructions = ({instructions}) => (
	<fieldset className='list pl0 bn'>
		{instructions.map((instruction, i) => {
			const [completed, setInstructionCompleted] = useState(false);
			return (
				<div key={i} className='pv1 lh-copy'>
					<legend className='mv0 f4 b'>{`Step ${i + 1}`}</legend>
					<label
						htmlFor={`instruction-${i}`}
						className={`${completed ? 'strike' : ''}`}
					>
						{instruction}
					</label>
					<input
						type='checkbox'
						onChange={() => setInstructionCompleted(completed => !completed)}
						className='glow o-0'
						id={`instruction-${i}`}
						checked={completed}
					/>
				</div>
			);
		})}
	</fieldset>
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
					{data.allLibJson.nodes[0].image && (
						<Img
							placeholderClassName='w-100'
							className='w-100 br4 br--top'
							style={{height: '25em'}}
							imgStyle={{height: '25em'}}
							fluid={data.allLibJson.nodes[0].image.childImageSharp.fluid}
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
						<div className='fl w-100 w-50-ns pa2 center dn-ns'>
							<div className='bb w-100 b--light-gray' />
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
		allLibJson(filter: {slug: {eq: $slug}}) {
			nodes {
				slug
				title
				rating
				image {
					childImageSharp {
						fluid(maxWidth: 1920, maxHeight: 1080) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`;

export default Recipe;
