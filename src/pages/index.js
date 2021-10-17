import React, {useState, useEffect} from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import {Search} from '../components/search';
import {Feature} from '../components/feature';

const IndexPage = () => {
	const [shown, setShown] = useState(24);
	const handleScroll = e => {
		const scrolled = Math.round(
			window.innerHeight + document.documentElement.scrollTop
		);
		const totalScrollable = document.documentElement.offsetHeight - 100;
		if (scrolled > totalScrollable) {
			setShown(prev => prev + 12);
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
			allLibJson(sort: {fields: rating, order: DESC}) {
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
			<Seo title='Home' />
			<div className='mw-100'>
				<Search />
				<div className='w100'>
					<div className='flex-l flex-wrap-l justify-center-l'>
						{data.allLibJson.nodes.slice(0, shown).map((recipe, i) => (
							<Feature key={i} {...recipe} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
