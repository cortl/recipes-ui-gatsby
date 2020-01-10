import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Image from './image';

const Header = ({siteTitle}) => (
	<header className='tc pv3 pv3-ns bb bg-light-red'>
		<Image />
		<h1 className='f5 f4-ns fw6 mid-gray geneva'>
			<Link to='/' className='link dim white'>
				{siteTitle}
			</Link>
		</h1>
	</header>
);

Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: ``,
};

export default Header;
