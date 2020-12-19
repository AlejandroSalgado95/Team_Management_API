import React from 'react';
import {NavLink} from 'react-router-dom';


const Header = () => (
	<header>
		<h1>STM</h1>
		<NavLink to ="/" activeClassName="is-active" exact = {true}> Home</NavLink>
		<NavLink to ="/chat" activeClassName="is-active"> Chat</NavLink>
	</header>
)

export default Header;
