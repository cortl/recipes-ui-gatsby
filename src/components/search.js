import React, {useState} from 'react';
import Fuse from 'fuse.js';
import {useStaticQuery, graphql, Link} from 'gatsby';

const FUSE_CONFIG = {
	keys: ['rating', 'title'],
	tokenize: true,
	threshold: 0.6,
};
const LIMIT = 10;

const toSearch = ({slug, title, rating}) => ({
	url: `/recipes/${slug}/`,
	key: title,
	title,
	rating,
	value: `${title} - ${rating}/10`,
});

const searchFor = (data, text) => {
	const items = data.allRecipesJson.nodes.map(toSearch);
	const fuse = new Fuse(items, FUSE_CONFIG);
	return fuse.search(text).slice(0, LIMIT);
};

export const Search = () => {
	const [results, setResults] = useState([]);

	const data = useStaticQuery(graphql`
		query AllRecipesQuery {
			allRecipesJson {
				nodes {
					slug
					title
					rating
				}
			}
		}
	`);

	return (
		<>
			<form className='pt3'>
				<div className='pa2 w-100 w-80-m w-60-l center'>
					<label htmlFor='name' className='f6 b db mb2'>
						Search
					</label>
					<input
						id='name'
						className='ba b--black-20 pa2 mb2 db w-100'
						type='text'
						aria-describedby='name-desc'
						onChange={e => {
							setResults(searchFor(data, e.target.value));
						}}
					/>
				</div>
			</form>
			<ul className='list pl0 center br bl w-70-l w-100'>
				{results.map((item, i) => {
					const className = `dim ph3 pv3 bb ${i === 0 ? 'bt' : ''}`;
					return (
						<Link key={`search${i}`} to={item.url} className='link black'>
							<li key={`${i}${item.title}`} className={className}>
								{item.title}
							</li>
						</Link>
					);
				})}
			</ul>
		</>
	);
};
