import React from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';

export default class HomePage extends React.Component {
	
	render(){
		return (
			<div>
				<Header />
				<p>This is whats supposed to be the home page</p>
				<button><Link to="/home">Chat</Link></button>
				<button><Link to="/users">User list</Link></button>
				<button><Link to="/tasks">Task list</Link></button>

			</div>
		)
	}

}

