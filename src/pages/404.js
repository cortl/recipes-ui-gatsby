import React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const NotFoundPage = () => (
	<Layout>
		<Seo title='404' />
		<div className='w-100 center tc'>
			<h1 className='f2'>{'Oops! 😿'}</h1>
			<p className='f3'>{`Looks like you've taken a wrong turn!`}</p>
		</div>
	</Layout>
);

export default NotFoundPage;
