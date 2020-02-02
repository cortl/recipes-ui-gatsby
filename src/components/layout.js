import React from 'react';
import PropTypes from 'prop-types';
import {useStaticQuery, graphql} from 'gatsby';

import Header from './header';
import 'tachyons-sass/tachyons.scss';

const Layout = ({children}) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<>
			<Header siteTitle={data.site.siteMetadata.title} />
			<div className='bg-white sans-serif'>
				<main>{children}</main>
				<footer></footer>
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
