import React, {useState} from 'react';
import Fuse from 'fuse.js';
import {useStaticQuery, graphql, navigate, Link} from 'gatsby';

const DOWN = 40;
const UP = 38;
const ESC = 27;

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
	const [selected, setSelected] = useState(-1);

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

	const useKeybind = e => {
		if (e.key === 'Enter') {
			if (selected === -1) {
				navigate(results[0].url);
			} else {
				navigate(results[selected].url);
			}
			e.preventDefault();
		} else if (e.keyCode === DOWN) {
			if (selected < results.length - 1) {
				setSelected(selected + 1);
			}
		} else if (e.keyCode === UP) {
			if (selected != 0) {
				setSelected(selected - 1);
			}
		} else if (e.keyCode === ESC) {
			setResults([]);
			setSelected(0);
		}
	};
	return (
		<form className='ph2 ph0-ns mb4 w-100 w-60-m w-40-l mw-100 mw7-l relative center'>
			<div className='w-100'>
				<input
					id='name'
					className='ba br4 b--black-20 pa2 db w-100'
					type='text'
					aria-describedby='name-desc'
					placeholder='Search'
					onChange={e => {
						setSelected(-1);
						setResults(searchFor(data, e.target.value));
					}}
					onKeyPress={useKeybind}
					onKeyDown={useKeybind}
				/>
			</div>
			{Boolean(results.length) && (
				<div style={searchResult} className='absolute w-100'>
					<ul
						style={noListPrefix}
						className='list bg-white w-100 ba br4 b--light-gray'
					>
						{results.map((item, i) => {
							let className = `dim bb b--light-gray pl3 pr3 pv3 ${
								selected === i ? 'b' : ''
							}`;
							return (
								<Link
									key={`search${i}`}
									to={item.url}
									className='link black w-100'
								>
									<li key={`${i}${item.title}`} className={className}>
										<span>{item.title}</span>
										<span className='tr fr'>{`${item.rating}/10`}</span>
									</li>
								</Link>
							);
						})}
					</ul>
				</div>
			)}
		</form>
	);
};
