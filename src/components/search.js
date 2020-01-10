import React, {Component} from 'react';
import Fuse from 'fuse.js';
import {Link} from 'gatsby';

const FUSE_CONFIG = {
	keys: ['rating', 'title'],
	tokenize: true,
	threshold: 0.6,
};
const LIMIT = 10;

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.fuse = new Fuse(props.data, FUSE_CONFIG);
		console.log(this.fuse);
		this.state = {
			items: [],
		};
	}

	searchFor = value => {
		const items = this.fuse.search(value).slice(0, LIMIT);
		this.setState({items});
	};

	render = () => (
		<>
			<form className='pt3'>
				<div className='w-100 w-80-m w-60-l center'>
					<label htmlFor='name' className='f6 b db mb2'>
						Search
					</label>
					<input
						id='name'
						className='ba b--black-20 pa2 mb2 db w-100'
						type='text'
						aria-describedby='name-desc'
						onChange={e => this.searchFor(e.target.value)}
					/>
				</div>
			</form>
			<ul className='list pl0 center br bl w-70-l w-100'>
				{this.state.items.map((item, i) => {
					const className = `dim ph3 pv3 bb ${i === 0 ? 'bt' : ''}`;
					return (
						<Link to={item.url} className='link black'>
							<li key={`${i}${item.title}`} className={className}>
								{item.title}
							</li>
						</Link>
					);
				})}
			</ul>
		</>
	);
}
