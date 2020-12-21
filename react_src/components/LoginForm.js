import React from 'react';

export default  class LoginForm extends React.Component {
  
  state = {
      account:undefined,
      password:undefined,
      error:''
  }

  onAccountChange = (e) => {
    const account = e.target.value;
    this.setState(() => ({ account }));
    
  };


  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
    
  };


  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.account || !this.state.password) {
      this.setState(() => ({ error: 'Please provide account and password.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.sendFormData({
        account: this.state.account,
        password: this.state.password
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Account"
            autoFocus
            value={this.state.account}
            onChange={this.onAccountChange}
          />
          <input
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }

}
