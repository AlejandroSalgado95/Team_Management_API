import React from 'react';
import { compose } from 'redux';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { startDeleteSession, resetModal } from '../actions/session';
import Modal from 'react-modal';


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
					<header>
						<h1>STM</h1>
						<button onClick = {this.doLogout}>Logout</button>
						<NavLink to ="/home" activeClassName="is-active">Home</NavLink>
						<NavLink to ={`/users/${profileId}`}  activeClassName="is-active"> {profileAccount}</NavLink>
					</header>
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
