import React from 'react';
import { Link, withRouter} from 'react-router-dom';


const UserListItem = (props) =>  (
		  
	    <div onClick = {()=>{props.history.push(`/users/${props.id}`)}} >
	    	<h3>{props.account}</h3>
		    <p>Name: {props.name}</p>
		    <p>User type: {props.user_type}</p>
		</div>
)
	



export default withRouter(UserListItem);