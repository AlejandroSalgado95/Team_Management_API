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
			<div>
				<p>This is the splash screen</p>	
				<img src="img/favicon.png" width="500" height="600"></img>
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


