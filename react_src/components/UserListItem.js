import React from 'react';
import { Link } from 'react-router-dom';


const UserListItem = (props) =>  (
		  
	<Link to={`/users/${props.id}`}>
	    <div>
	    	<h3>{props.account}</h3>
		    <p>Name: {props.name}</p>
		    <p>User type: {props.user_type}</p>
		</div>
	 </Link>

)
	



export default UserListItem