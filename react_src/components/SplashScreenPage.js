import React from 'react';
import { connect } from 'react-redux';
import { startAddSessionBySessionId } from '../actions/session';

export class SplashScreenPage extends React.Component {


     componentDidMount() {
     	this.props.startAddSessionBySessionId();
      }



	render(){
		if (this.props.session.hasSession)
			this.props.history.push("/home");

		else if ( !this.props.session.hasSession && !this.props.session.loadingSession )
			this.props.history.push("/login");

		return (
			<div className="center" style={{marginTop:"100px",marginBottom:"0px"}}>
				<img src={`${window.location.origin}/img/logo.png`} width="250" height="250"></img>
				<h2>STM</h2>
			</div>
		)

	}



}


const mapStateToProps = (state, props) => ({
  session: state.session
});


const mapDispatchToProps = (dispatch) => ({
  startAddSessionBySessionId: () => dispatch(startAddSessionBySessionId()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreenPage);


