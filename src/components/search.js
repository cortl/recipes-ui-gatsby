import React, {useState} from 'react';
import Fuse from 'fuse.js';
import {useStaticQuery, graphql, Link} from 'gatsby';

const FUSE_CONFIG = {
	keys: ['rating', 'title'],
	tokenize: true,
	threshold: 0.6,
};
const LIMIT = 10;
const noListPrefix = {paddingInlineStart: '0px', marginBlockStart: '0px'};
const searchResult = {zIndex: 50};

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
		<div className='pt2 pb2 mh2'>
			<div className='br2 bg-white shadow-4 mt2 pb2'>
				<form className='pt3'>
					<div className='w-100 pt2 pb2 w-80-m w-60-l relative center'>
						<label htmlFor='name' className='f3 b db mb2'>
							{'Search'}
						</label>
						<input
							id='name'
							className='ba b--black-20 pa2 db w-100'
							type='text'
							aria-describedby='name-desc'
							onChange={e => {
								setResults(searchFor(data, e.target.value));
							}}
						/>
						{Boolean(results.length) && (
							<div style={searchResult} className='absolute w-100'>
								<ul
									style={noListPrefix}
									className='list bg-white w-100 ba br2 b--light-gray'
								>
									{results.map((item, i) => {
										let className = `dim bb b--light-gray pl3 pr3 pv3 ${
											i === 0 ? '' : ''
										}`;
										return (
											<Link
												key={`search${i}`}
												to={item.url}
												className='link black w-100'
											>
												<li key={`${i}${item.title}`} className={className}>
													{item.title}
												</li>
											</Link>
										);
									})}
								</ul>
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};
