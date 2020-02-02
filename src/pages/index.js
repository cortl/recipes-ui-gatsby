import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import {Search} from '../components/search';
import {Feature} from '../components/feature';

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query TopRecipesQuery {
			allRecipesJson(limit: 9, sort: {fields: rating, order: DESC}) {
				nodes {
					slug
					title
					rating
					image {
						childImageSharp {
							fluid(maxWidth: 300, maxHeight: 300) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	`);

	return (
		<Layout>
			<SEO title='Home' />

			<div className='mw100 mw9-m mw8-l center'>
				<Search />
				<div>
					{data.allRecipesJson.nodes.map((recipe, i) => (
						<Feature {...recipe} />
					))}
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
