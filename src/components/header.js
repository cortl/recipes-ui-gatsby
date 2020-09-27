import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Image from './image';

const Header = () => (
	<header className='w100 tc'>
		<Link to='/' className='link dim'>
			<h1 className='helvetica black f1 lh-solid'>{"Cortlan's Recipes"}</h1>
		</Link>
	</header>
);

Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: ``,
};

export default Header;
