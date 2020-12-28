import React from 'react';
import { Link,withRouter } from 'react-router-dom';


class TaskListItem extends React.Component{
	
	formatCreationDate = (date) => (date.split("T")[0])

	goToTask = (id) => {
		this.props.history.push(`/tasks/${id}`);
	}

	render(){
		return (
		    <div onClick = {()=>{this.goToTask(this.props.id)}}>
		        <h3>{this.props.name}</h3>
		        <p>Assigned to: {this.props.assignedToUser.name}</p>
		        <p>Creation date: {this.formatCreationDate(this.props.creationDate)}</p>
		        <p>Status: {this.props.status? "done" : "pending"}</p>
		    </div>

		)
	}

}

export default withRouter(TaskListItem);
