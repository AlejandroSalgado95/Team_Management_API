import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startAddUserList} from '../actions/userList';
import UserList from './UserList'

export class UserListPage extends React.Component {


  goBack = () => {
    console.log(this.props.history);
    this.props.history.goBack();
  }


  addUser = () => {
    console.log(this.props.history);
    this.props.history.push("/users/add");
  }

  componentDidMount() {
    this.props.startAddUserList();
  }


  render(){

    const user_type = this.props.session.profile.user_type;
    const showAddUser = (user_type === "admin")? true : false;


    return (
      <div>
        <Header/>
        <button onClick = {this.goBack}>Back</button>
        {showAddUser && <Link to = "/users/add"><button>Add user</button></Link>}
        {this.props.userList.error && <p>{this.props.userList.error}</p>}
        {this.props.userList.loadingUserList && <p>loading user list...</p> }
        {!this.props.userList.loadingUserList && <UserList users = {this.props.userList.users} loading = {this.props.userList.loadingUserList} />}
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
  startAddUserList: () => dispatch(startAddUserList())
});


export default connect(mapStateToProps,mapDispatchToProps)(UserListPage);
