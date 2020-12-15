import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const mapRecipesToYear = recipes =>
	recipes
		.filter(recipe => recipe.createdDate)
		.reduce((years, recipe) => {
			const year = new Date(recipe.createdDate).getFullYear();
			if (year in years) {
				years[year].push(recipe);
			} else {
				years[year] = [recipe];
			}
			return years;
		}, {});

const byRating = (recipeA, recipeB) =>
	recipeA.last_nom > recipeB.last_nom
		? 1
		: recipeB.last_nom > recipeA.last_nom
		? -1
		: 0;

const StatsPage = () => {
	const {allRecipesJson} = useStaticQuery(graphql`
		query StatsRecipesQuery {
			allRecipesJson {
				nodes {
					slug
					title
					rating
					createdDate
					ingredients {
						items
					}
				}
			}
		}
	`);

	const recipes = allRecipesJson.nodes;
	const recipesByYear = mapRecipesToYear(recipes);
	return (
		<Layout>
			<SEO title='Statistics' />
			<div className='w-90 center'>
				<section>
					<h1 className='f2 lh-copy'>{'Overall'}</h1>
					<p>
						<span className='b'>{'Total recipes created: '}</span>
						{`${recipes.length}`}
					</p>
					<p>
						<span className='b'>{'Recipes without dates 😥: '}</span>
						{`${recipes.filter(recipe => !recipe.createdDate).length}`}
					</p>
				</section>
				{Object.keys(recipesByYear)
					.sort()
					.reverse()
					.map(year => {
						const recipesInYear = recipesByYear[year];
						return (
							<section key={year}>
								<h1 className='f2 lh-copy'>{year}</h1>
								<p>
									<span className='b'>{'Total number of recipes made: '}</span>
									{recipesInYear.length}
								</p>
								<p>
									<span className='b'>{'Average rating given: '}</span>
									{Math.round(
										(recipesInYear.reduce(
											(total, {rating}) => total + rating,
											0
										) /
											recipesInYear.length) *
											100
									) / 100}
								</p>
								<p>
									<span className='b'>{'Number of 10s given: '}</span>
									{recipesInYear.filter(recipe => recipe.rating === 10).length}
								</p>
								<p>
									<span className='b'>{'Top three recipes: '}</span>
								</p>
								<ol>
									{recipesInYear
										.sort(byRating)
										.slice(0, 3)
										.map(recipe => (
											<li
												key={recipe.slug}
											>{`${recipe.title} - ${recipe.rating}/10`}</li>
										))}
								</ol>
							</section>
						);
					})}
			</div>
		</Layout>
	);
};

export default StatsPage;
