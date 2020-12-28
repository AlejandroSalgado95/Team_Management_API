import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { startAddTask } from '../actions/task';
import TaskCommentList from './TaskCommentList'

class TaskPage extends React.Component {
	

	  goBack = () => {
		console.log(this.props.history);
		this.props.history.goBack();
	  }

	  formatCreationDate = (date) => (date.split("T")[0])


	  componentDidMount() {
	  	const task = {id: this.props.match.params.id};
     	console.log(task.id);
     	this.props.startAddTask(task);


      }


	render(){
	    

		return (
			<div>
				<Header />
				<button onClick = {this.goBack}>Back</button>
				{this.props.task.loadingTask && <p>loading task..</p>}
				{this.props.task.errorTask && <p>{this.props.task.errorTask}</p>}
				{!this.props.task.loadingTask && <p>Name: {this.props.task.name} </p> }
				{!this.props.task.loadingTask && <p>Created by user: {this.props.task.createdByUser.account}</p>}
				{!this.props.task.loadingTask && <p>Creation date: {this.formatCreationDate(this.props.task.creationDate)}</p>}
				{!this.props.task.loadingTask && <p>Assigned to user: {this.props.task.assignedToUser.account}</p>}
				{!this.props.task.loadingTask && <p>Status: {this.props.task.status?"done":"pending"}</p>}
				<TaskCommentList taskComments = {this.props.task.taskComments} loading = {this.props.task.loadingTask}/>
			</div>
		)
	}

}


const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  task: state.actualTask
});


const mapDispatchToProps = (dispatch) => ({
  startAddTask: (task) => dispatch(startAddTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
