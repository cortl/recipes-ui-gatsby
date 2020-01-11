import React from 'react';
import PropTypes from 'prop-types';
import {useStaticQuery, graphql} from 'gatsby';

import Header from './header';
import './layout.css';
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
			<div className='w-100 bg-white helvetica'>
				<main className='w-50-l w-100 pa2 center'>{children}</main>
				<footer></footer>
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
