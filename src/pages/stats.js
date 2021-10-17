import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';

const byRating = (recipeA, recipeB) =>
	recipeB.rating > recipeA.rating
		? 1
		: recipeA.rating > recipeB.rating
			? -1
			: 0;

const calculateAverageFromField = (objects, field) =>
	Math.round(
		(objects.reduce((total, obj) => total + obj[field], 0) / objects.length) *
		100
	) / 100;

const YearlyStats = ({year, recipes}) => {
	return (
		<section>
			<h1 className='f2 lh-copy'>{year}</h1>
			<p>
				<span className='b'>{'Total number of recipes made: '}</span>
				{recipes.length}
			</p>
			<p>
				<span className='b'>{'Average rating given: '}</span>
				{calculateAverageFromField(recipes, 'rating')}
			</p>
			<p>
				<span className='b'>{'Number of 10s given: '}</span>
				{recipes.filter(recipe => recipe.rating === 10).length}
			</p>
			<p>
				<span className='b'>{'Top three recipes: '}</span>
			</p>
			<ol>
				{recipes
					.sort(byRating)
					.slice(0, 3)
					.map(({slug, title, rating}) => (
						<li key={slug}>
							<Link to={`/recipes/${slug}/`} className='link black underline'>
								{`${title} - ${rating}/10`}
							</Link>
						</li>
					))}
			</ol>
		</section>
	);
};

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

const StatsPage = () => {
	const {allLibJson} = useStaticQuery(graphql`
		query StatsRecipesQuery {
			allLibJson {
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

	const recipes = allLibJson.nodes;
	const recipesByYear = mapRecipesToYear(recipes);

	return (
		<Layout>
			<Seo title='Statistics' />
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
					.map(year => (
						<YearlyStats key={year} year={year} recipes={recipesByYear[year]} />
					))}
			</div>
		</Layout>
	);
};

export default StatsPage;
