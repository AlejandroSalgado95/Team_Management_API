import React from 'react';
import { connect } from 'react-redux';

class UserForm extends React.Component {
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

  componentDidUpdate(){

      let elems = document.querySelectorAll('select');
      M.FormSelect.init(elems, {});

  }

  render() {

    const user_type = this.props.session.profile.user_type;
    const profileId = this.props.session.profile._id;
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
      <div className="center" style={{marginTop:"80px", marginBottom:"70px"}} >
        {this.state.error && <p className="s-font-size">{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          {showAccount && <input
            type="text"
            placeholder="Account"
            value={this.state.account}
            onChange={this.onAccountChange}
            style={{width:"70%"}}
          />}
          {showName && <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onNameChange}
            style={{width:"70%"}}
          />}
          {showRole && <input
            type="text"
            placeholder="role"
            value={this.state.role}
            onChange={this.onRoleChange}
            style={{width:"70%"}}
          />}
          {showPassword && <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
            style={{width:"70%"}}
          />}
          {showConfirmPassword && <input
            type="password"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.onConfirmPasswordChange}
            style={{width:"70%"}}
          />}
          {showUserType && <center><div className="input-field" style={{width:"70%"}} ><select onChange={this.onUserTypeChange}>
              <option value = ""  disabled selected>None</option>
              {(this.state.user_type == "user")?(<option value = "user"  selected>user</option>):(<option value = "user" >user</option>)}
              {(this.state.user_type == "admin")?(<option value = "admin"  selected>admin</option>):(<option value = "admin" >admin</option>)}

            </select><label>User type</label></div></center>
          }

          <div className="center" style={{marginTop:"40px"}}><a onClick={this.onSubmit}className="btn btn-large brand-color" style={{backgroundColor: "#112e47", color:"white"}}>{this.props.isAddForm?"Create user":"Update user"}</a></div>

        </form>
      </div>
    );
  }

}


const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  session: state.session
});

export default connect(mapStateToProps, null)(UserForm);


