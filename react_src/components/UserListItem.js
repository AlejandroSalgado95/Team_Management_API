import React from 'react';
import { Link, withRouter} from 'react-router-dom';


const UserListItem = (props) =>  (
		  
	    <li className="collection-item avatar" onClick = {()=>{props.history.push(`/users/${props.id}`)}}>
	      <i className="material-icons circle black large">assignment_ind</i>
	      <p className="title m-font-size">{props.account}</p>
	      <p className="s-font-size">Name: {props.name} </p>
		  <p className="s-font-size">User type: {props.user_type}</p>
	      <a className="secondary-content"><i class="material-icons medium">arrow_forward</i></a>
	    </li>

)
	



export default withRouter(UserListItem);