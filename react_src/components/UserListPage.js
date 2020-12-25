import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { startAddUserList} from '../actions/userList';
import UserList from './UserList'


export class UserListPage extends React.Component {


  goBack = () => {
    console.log(this.props.history);
    this.props.history.goBack();
  }

  componentDidMount() {
    this.props.startAddUserList();
  }


  render(){
    return (
      <div>
        <Header/>
        <button onClick = {this.goBack}>Back</button>
        {this.props.userList.error && <p>{this.props.userList.error}</p>}
        {this.props.userList.loadingUserList && <p>loading user list...</p> }
        <UserList users = {this.props.userList.users} loading = {this.props.userList.loadingUserList} />
      </div>
    )

  }



}


const mapStateToProps = (state) => {
  return {
    userList: state.userList
  };
};


const mapDispatchToProps = (dispatch) => ({
  startAddUserList: () => dispatch(startAddUserList())
});


export default connect(mapStateToProps,mapDispatchToProps)(UserListPage);
