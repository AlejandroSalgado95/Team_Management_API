import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startAddUserList} from '../actions/userList';
import UserList from './UserList'
import Footer from './Footer'

export class UserListPage extends React.Component {


  goBack = () => {
    console.log(this.props.history);
    this.props.history.goBack();
  }


  goToAddUser = () => {
    console.log(this.props.history);
    this.props.history.push("/users/add");
  }

  componentDidMount() {
    this.props.startAddUserList(this.props.session.profile._id);
  }


  render(){

    const user_type = this.props.session.profile.user_type;
    const showAddUser = (user_type === "admin")? true : false;


    return (
      <div>
        <Header/>
        <a onClick = {this.goBack} className="btn-large brand-color left" style={{margin:"10px"}} ><i className="material-icons left">arrow_back</i>Back</a>
        {showAddUser? (<a onClick={this.goToAddUser} className="btn-large brand-color right" style={{margin:"10px"}}><i className="material-icons left">add</i>Add user</a>):(<a className="btn-large brand-color right" style={{margin:"10px"}} disabled><i className="material-icons left">add</i>Add user</a>)}
        {this.props.userList.error && <p>{this.props.userList.error}</p>}
        {this.props.userList.loadingUserList && <div className="m-font-size center" style={{marginTop:"100px"}}><p>loading user list...</p></div> }
        {!this.props.userList.loadingUserList && <UserList users = {this.props.userList.users} loading = {this.props.userList.loadingUserList}/>}
        <Footer/>
      </div>
    )

  }



}


const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  session: state.session,
  userList: state.userList
});


const mapDispatchToProps = (dispatch) => ({
  startAddUserList: (profileId) => dispatch(startAddUserList(profileId))
});


export default connect(mapStateToProps,mapDispatchToProps)(UserListPage);
