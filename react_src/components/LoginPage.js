import React from 'react';
import { connect } from 'react-redux';
import { startAddProfile } from '../actions/profile';
import LoginForm from "./LoginForm"

export class LoginPage extends React.Component {
  
  sendFormData = (profile) => {
    this.props.startAddProfile(profile);
    //this.props.history.push('/');
  };

  render() {
    
    if (this.props.profile.account != undefined)
      this.props.history.push('/home');

    return (
      <div>
        
        {this.props.profile.loading && <p>loading profile...</p>}
        {this.props.profile.error && <p>{this.props.profile.error}</p>}
        <h1>Introduce credentials </h1>
        <LoginForm sendFormData={this.sendFormData}/>
      </div>

    );
  }
}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  profile: state.profile
});


const mapDispatchToProps = (dispatch) => ({
  startAddProfile: (profile) => dispatch(startAddProfile(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
