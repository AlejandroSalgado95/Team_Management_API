import React from 'react';
import { compose } from 'redux';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { startDeleteSession, resetModal } from '../actions/session';
import Modal from 'react-modal';
import M from 'materialize-css'


class Header extends React.Component  {

		doLogout = () => {
		  this.props.startDeleteSession();
		}

		closeModal = () => {
		  this.props.resetModal();
		}


		componentDidMount(){
		    this.props.resetModal();

		}

		render(){

			if (!this.props.session.hasSession)
				this.props.history.push("/login")

			const profileId = this.props.session.profile._id ;
			const profileAccount = this.props.session.profile.account;
			
			return (
				<div>
					<div className="navbar-fixed">
					  <nav className="brand-color">
					    <div className="nav-wrapper">
					      <img src={`${window.location.origin}/img/logo.png`} className="logo-image" alt="logo" width="50" height="50"></img>
					      <span className="brand-logo l-font-size" style={{marginTop:"5px"}}>STM</span>
					      <ul id="nav-mobile" className="right hide-on-med-and-down">
					      	<li><NavLink to="#" onClick = {this.doLogout} className = "s-font-size">Logout</NavLink></li>
							<li><NavLink to ="/home" activeClassName="is-active" className = "s-font-size">Home</NavLink></li>
							<li><NavLink to ={`/users/${profileId}`}  activeClassName="is-active" className = "s-font-size"> {profileAccount}</NavLink></li>
					      </ul>
					    </div>
					  </nav>
					</div>
					  <img src ={`${window.location.origin}/img/banner-3.jpg`}className="banner-image"></img>

					<Modal
			            isOpen={this.props.session.modal}
			            onRequestClose={this.closeModal}
	          		>
			          {this.props.session.modal}
			          <button onClick={this.closeModal}>close</button>

			        </Modal>


				</div>
			)
		}
		
	}

const mapStateToProps = (state, props) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  startDeleteSession: () => dispatch(startDeleteSession()),
  resetModal: () => dispatch(resetModal())
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
