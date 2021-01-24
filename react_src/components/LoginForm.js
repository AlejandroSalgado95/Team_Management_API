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

      <div >
        {this.state.error && <p>{this.state.error}</p>}
        <center>
        <div class="container">
        <form onSubmit={this.onSubmit} style={{  borderRadius: '25px',  background: '#f0f1f2', width:'40%'}}>
          <div className="row" style={{marginTop:"50px",paddingTop:"25px"}}>
            <div className = "col s10 offset-s1">
              <input
                type="text"
                placeholder="Account"
                autoFocus
                value={this.state.account}
                onChange={this.onAccountChange}
              />
            </div>
          </div>
          <div className="row">
            <div className = "col s10 offset-s1"  >
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
            </div>
          </div>
          <div className="center" style={{margin:"25px",padding:"25px"}}><a onClick={this.onSubmit}className="btn btn-large brand-color" style={{backgroundColor: "#112e47", color:"white"}}>Login</a></div>
        </form>
        </div>
        </center>
      </div>
    

    );
  }

}
