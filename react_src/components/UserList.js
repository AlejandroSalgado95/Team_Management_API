import React from 'react';
import UserListItem from './UserListItem';


const UserList = (props) => {

  let showNoUsersFound = false;
  let showUsers = false;

  if (!props.loading && props.users.length === 0)
    showNoUsersFound = true;

  if (props.users.length > 0)
    showUsers = true;

  return(
      <div >
        {showNoUsersFound && <p className="m-font-size center">No users found</p>}
        <div style={{ margin:"100px",height:"500px",overflow:" scroll"}}>
          <ul class="collection">
          { showUsers && props.users.map((user) => {return <UserListItem key={user._id} id = {user._id} account = {user.account} name = {user.name} user_type ={user.user_type} />;})}
          </ul>
        </div>
      </div>
    );
}

  

export default UserList;

