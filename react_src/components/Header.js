import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends React.Component  {

		render(){
			const profileId = this.props.session.profile._id ;
			const profileAccount = this.props.session.profile.account;
			
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

const mapStateToProps = (state, props) => ({
  session: state.session
});


export default connect(mapStateToProps, null)(Header);
