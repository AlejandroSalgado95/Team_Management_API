import React from 'react';
import { Link } from 'react-router-dom';


export default class TaskListItem extends React.Component{
	
	formatCreationDate = (date) => (date.split("T")[0])

	constructor(props) {
	  super(props);
	}

	render(){
		return (
		  <Link to={`/tasks/${this.props.id}`}>
		    <div>
		        <h3>{this.props.name}</h3>
		        <p>Assigned to: {this.props.assignedToUser.name}</p>
		        <p>Creation date: {this.formatCreationDate(this.props.creationDate)}</p>
		        <p>Status: {this.props.status? "done" : "pending"}</p>
		    </div>
		  </Link>

		)
	}

}

