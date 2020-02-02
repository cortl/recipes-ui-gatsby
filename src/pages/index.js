import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import {Search} from '../components/search';
import {Feature} from '../components/feature';

const IndexPage = () => {
	const [shown, setShown] = useState(6);
	const handleScroll = e => {
		const scrolled = Math.round(
			window.innerHeight + document.documentElement.scrollTop
		);
		const totalScrollable = document.documentElement.offsetHeight - 100;
		if (scrolled === totalScrollable) {
			setShown(prev => prev + 6);
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
	const data = useStaticQuery(graphql`
		query TopRecipesQuery {
			allRecipesJson(sort: {fields: rating, order: DESC}) {
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
					{data.allRecipesJson.nodes.slice(0, shown).map((recipe, i) => (
						<Feature key={`recipe${i}`} {...recipe} />
					))}
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
