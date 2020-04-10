import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Image from './image';

const Header = ({siteTitle}) => (
	<header className='tc pv3 pv3-ns bb bw4 b--black-10 bg-light-red sans-serif'>
		<Link to='/' className='link dim '>
			<Image />
			<h1 className='white'>{siteTitle}</h1>
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
