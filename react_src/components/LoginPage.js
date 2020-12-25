import React from 'react';
import { connect } from 'react-redux';
import { startAddUserByLogin } from '../actions/user';
import LoginForm from "./LoginForm"

export class LoginPage extends React.Component {
  
  sendFormData = (profile) => {
    this.props.startAddUserByLogin(profile);
    //this.props.history.push('/');
  };

  render() {
    
    if (this.props.profile.account != undefined)
      this.props.history.push('/home');

    return (
      <div>
        
        {this.props.profile.loadingUser && <p>loading...</p>}
        {this.props.profile.errorUser && <p>{this.props.profile.errorUser}</p>}
        <h1>Introduce credentials </h1>
        <LoginForm sendFormData={this.sendFormData}/>
      </div>

    );
  }
}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  profile: state.actualUser
});


const mapDispatchToProps = (dispatch) => ({
  startAddUserByLogin: (profile) => dispatch(startAddUserByLogin(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
