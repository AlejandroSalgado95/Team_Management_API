import React from 'react';
import { Link,withRouter } from 'react-router-dom';


class TaskListItem extends React.Component{
	
	formatCreationDate = (date) => (date.split("T")[0])

	goToTask = (id) => {
		this.props.history.push(`/tasks/${id}`);
	}

	render(){
		return (

			  <li className="collection-item avatar" onClick = {()=>{this.goToTask(this.props.id)}}>
			      <i className="material-icons circle black large">assignment</i>
			      <p className="title m-font-size">{this.props.name}</p>
			      {this.props.assignedToUser?(<p className="s-font-size">Assigned to: {this.props.assignedToUser.name} </p>) : (<p className="s-font-size">Assigned to: Deleted user</p>)}
			      <p className="s-font-size">Creation date: {this.formatCreationDate(this.props.creationDate)}</p>
				  <p className="s-font-size">Status: {this.props.status? "done" : "pending"}</p>
			      <a className="secondary-content"><i class="material-icons medium">arrow_forward</i></a>
			  </li>


		)
	}

}

export default withRouter(TaskListItem);
