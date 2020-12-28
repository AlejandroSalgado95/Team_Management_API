import React from 'react';

export default  class UserForm extends React.Component {
  /*
  state = {
      account:undefined,
      name: undefined,
      role: undefined,
      password:undefined,
      confirmPassword:undefined,
      user_type: undefined,
      error:undefined
  }*/

  constructor(props) {
    super(props);

    console.log("At edit page, account received:" , props.account);
    this.state = {
      _id:props._id,
      account:props.account,
      name: props.name,
      role: props.role,
      password:undefined,
      confirmPassword:undefined,
      user_type: props.user_type,
      error:undefined
    };
  }




  onAccountChange = (e) => {
    const account = e.target.value;
    this.setState(() => ({ account }));
    
  };


  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
    
  };


  onRoleChange = (e) => {
    const role = e.target.value;
    this.setState(() => ({ role }));
    
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
    
  };


  onConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    this.setState(() => ({ confirmPassword }));
    
  };
  
  onUserTypeChange = (e) => {
    const user_type = e.target.value;
    this.setState(() => ({ user_type }));
    
  };



  checkForError = () => {
    
    let error = undefined; 
    if (this.props.isAddForm){
      if (!this.state.account || !this.state.name || !this.state.role || !this.state.password || !this.state.confirmPassword || !this.state.user_type) {
        error = 'Please fill all the fields';
      } else if  (this.state.password != this.state.confirmPassword ){
        error = 'Passwords do not match!';
      }

    } else if (this.props.isEditForm){
        if  (this.state.password != this.state.confirmPassword ){
          error = 'Passwords do not match!';
        }
    }


    return error;
  }


  onSubmit = (e) => {
    e.preventDefault();
    let error = undefined;

    error = this.checkForError();
    
    if (error){
      this.setState(() => ({ error}));
    } else {
        this.setState(() => ({ error: undefined }));
        this.props.sendFormData({
          _id:this.state._id,
          account: this.state.account,
          name: this.state.name,
          role: this.state.role,
          password: this.state.password,
          user_type: this.state.user_type
        });
    }
  };

  render() {

    const user_type = sessionStorage.getItem('userType');
    const profileId = sessionStorage.getItem('profileId');

    let showRole;
    let showName;
    let showPassword;
    let showConfirmPassword;
    let showAccount;
    let showUserType;

    if (this.props.isAddForm){
      showRole = true;
      showName = true;
      showPassword = true;
      showConfirmPassword = true;
      showAccount = true;
      showUserType = true;

    } else if (this.props.isEditForm){

      if (user_type == "user"){
        showRole = false;
        showName = true;
        showPassword = true;
        showConfirmPassword = true;
        showAccount = false;
        showUserType = false;

      } else if (user_type == "admin"){
        if (profileId == this.state._id){
          showRole = true;
          showName = true;
          showPassword = true;
          showConfirmPassword = true;
          showAccount = false;
          showUserType = false;

        } else{

          showRole = true;
          showName = false;
          showPassword = false;
          showConfirmPassword = false;
          showAccount = false;
          showUserType = true;

        }
      }
    }

    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          {showAccount && <input
            type="text"
            placeholder="Account"
            autoFocus
            value={this.state.account}
            onChange={this.onAccountChange}
          />}
          {showName && <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onNameChange}
          />}
          {showRole && <input
            type="text"
            placeholder="role"
            value={this.state.role}
            onChange={this.onRoleChange}
          />}
          {showPassword && <input
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />}
          {showConfirmPassword && <input
            type="text"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.onConfirmPasswordChange}
          />}
          {showUserType &&
          <input
            type="text"
            placeholder="User type"
            value={this.state.user_type}
            onChange={this.onUserTypeChange}
          />}
          <button>{this.props.isAddForm?"Create user":"Update user"}</button>
        </form>
      </div>
    );
  }

}
