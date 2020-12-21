import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';

const NotFoundPage  = () => (
	<div>
		<Header/>
		404!
		Page not found - <Link to="/">Go home</Link>
	</div>
)

export default NotFoundPage;
