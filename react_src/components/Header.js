import React from 'react';
import {NavLink} from 'react-router-dom';

//import uuid from 'react-uuid'

/*
const Header = () => (
	<header>
		<h1>STM</h1>
		<button>Logout</button>
		<NavLink to ="/" activeClassName="is-active" exact = {true}> Home</NavLink>
		<NavLink to ="/chat" activeClassName="is-active"> Chat</NavLink>
		
	</header>
)*/


export class Header extends React.Component  {

		render(){
			const profileId = sessionStorage.getItem('profileId');
			const profileAccount = sessionStorage.getItem('profileAccount');
			
			return (
				<header>
					<h1>STM</h1>
					<button>Logout</button>
					<NavLink to ="/home" activeClassName="is-active">Home</NavLink>
					<NavLink to ={`/users/${profileId}`}  activeClassName="is-active"> {profileAccount}</NavLink>

				</header>
			)
		}
		
	}



export default Header;
