import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Image from './image';

const Header = ({siteTitle}) => (
	<header className='tc pv3 pv3-ns bb bg-light-red'>
		<Link to='/' className='link dim '>
			<Image />
			<h1 className='f5 f4-ns fw6 white dim geneva'>{siteTitle}</h1>
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
