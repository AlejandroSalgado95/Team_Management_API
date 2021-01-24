import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { startAddTask } from '../actions/task';
import {startRemoveTaskFromTaskList, resetModal } from '../actions/taskList';
import {startAddTaskCommentToTask } from '../actions/task';
import TaskCommentList from './TaskCommentList'
import TaskCommentForm from './SendForm'
import CustomModal from './CustomModal';
import Footer from './Footer';

class TaskPage extends React.Component {
	
	  state = {
	  	deleteModal: undefined,
	  	commentContent: undefined
	  }


	  insertTaskComment = (content) => {
	  	console.log("insertTaskCommentCalled");
	  	const taskFormData = {taskId: this.props.match.params.id , content};
	  	this.props.startAddTaskCommentToTask(taskFormData);
	  }

	  showDeleteModal = () =>{
	  	const deleteModal = "Do you want to delete this task?";
    	this.setState(() => ({ deleteModal }));
	  }

	  closeDeleteModal = () =>{
    	this.setState(() => ({ deleteModal: undefined }));
	  }
	
	/*
	  closeInsertCommentModal = () =>{
	  	console.log("closed insert comment modal");
	  	//this.props.resetInsertCommentModal();
	  }
	  */

	  closeModal = () => {
	  	console.log("closed update task modal");
	   	this.props.resetModal();
	    this.props.history.goBack();
	    
	  }

	  deleteTask = () =>{
	  	const id = this.props.match.params.id;
	  	this.props.startRemoveTaskFromTaskList(id);
	  	this.closeDeleteModal();
	  }



	  goBack = () => {
		console.log(this.props.history);
		this.props.history.goBack();
	  }

	  formatCreationDate = (date) => (date.split("T")[0]);


	  goToEditPage = () => {
	  	this.props.history.push(`/tasks/${this.props.match.params.id}/edit`);
	  }


	  componentDidMount() {
	  	this.props.resetModal();
	  	//this.props.resetInsertCommentModal();
     	this.closeDeleteModal();

	  	const task = {id: this.props.match.params.id};
     	console.log(task.id);
     	this.props.startAddTask(task);


      }


	render(){
	   	
	   	const user_type = this.props.session.profile.user_type;
		const profileId = this.props.session.profile._id;
		let showDelete = (user_type === "admin")? true : false;
		let showEdit = false;
		let showAddTaskComment = false;


		if (this.props.task.assignedToUser){
    		showEdit = ((user_type === "admin") || (profileId === this.props.task.assignedToUser._id))? true : false;
    	    showAddTaskComment = ((user_type === "admin") || (profileId === this.props.task.assignedToUser._id))? true : false;

    	}else if (user_type === "admin"){
    		showEdit = true;
    		showAddTaskComment = true;
    	}

		return (
			<div>
				<Header />
				<a onClick = {this.goBack} className="btn btn-large left" style={{margin:"10px"}} ><i className="material-icons left">arrow_back</i>Back</a>
				{showEdit?(<a onClick = {this.goToEditPage} className="btn btn-large right" style={{margin:"10px"}} ><i className="material-icons left">edit</i>Edit</a>):(<a  className="btn btn-large right" style={{margin:"10px"}} disabled ><i className="material-icons left">edit</i>Edit</a>)}
				{showDelete?(<div className="center"><a onClick = {this.showDeleteModal} className="btn btn-large center red darken-4" style={{margin:"10px"}} ><i className="material-icons left">warning</i>Delete</a></div>):(<div className="center"><a className="btn btn-large center red darken-4" style={{margin:"10px"}} disabled><i className="material-icons left">warning</i>Delete</a></div>)}
				{this.props.task.loadingTask && <div className="center"><p>loading task..</p></div>}
				{this.props.task.errorTask && <p>{this.props.task.errorTask}</p>}

				{!this.props.task.loadingTask && <div style={{marginTop:"50px"}}>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Name: {this.props.task.name} </p></div></div> 
					<div className="row" style={{margin:"0px"}}><div className="divider col s10 offset-s1" ></div></div>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Description: {this.props.task.description} </p></div></div>
					<div className="row" style={{margin:"0px"}}><div className="divider col s10 offset-s1" ></div></div>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Created by user: {this.props.task.createdByUser?(this.props.task.createdByUser.name):("Deleted user")}</p></div></div>
					<div className="row" style={{margin:"0px"}}><div className="divider col s10 offset-s1" ></div></div>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Creation date: {this.formatCreationDate(this.props.task.creationDate)}</p></div></div>
					<div className="row" style={{margin:"0px"}}><div className="divider col s10 offset-s1" ></div></div>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Assigned to user: {this.props.task.assignedToUser?(this.props.task.assignedToUser.name):("Deleted user")}</p></div></div>
					<div className="row" style={{margin:"0px"}}><div className="divider col s10 offset-s1" ></div></div>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Status: {this.props.task.status?"done":"pending"}</p></div></div>
				</div>}


				<TaskCommentList taskComments = {this.props.task.taskComments} loading = {this.props.task.loadingTask}/>
				{this.props.task.loadingTaskComments && <div className="center"><p>loading comments..</p></div>}
				{showAddTaskComment && !this.props.task.loadingTaskComments && <TaskCommentForm insertTaskComment = {this.insertTaskComment}/>}
				<Footer/>
				<CustomModal openModal = {this.state.deleteModal} closeModal = {this.closeDeleteModal}>
    				<a onClick = {this.deleteTask} className="btn-large red darken-4 right" style={{margin:"10px",  display: "block"}} >Delete</a>
				    <a onClick = {this.closeDeleteModal} className="btn-large brand-color right" style={{margin:"10px",  display: "block"}} >Close</a>
				</CustomModal>

				<CustomModal openModal = {this.props.taskList.modal} closeModal = {this.closeModal}>
		          <a onClick = {this.closeModal} className="btn-large brand-color right" style={{margin:"10px",  display: "block"}} >Accept</a>
				</CustomModal>
				
			</div>
		)
	}

}


const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  task: state.actualTask,
  taskList: state.taskList,
  session: state.session
});


const mapDispatchToProps = (dispatch) => ({
  startAddTask: (task) => dispatch(startAddTask(task)),
  startRemoveTaskFromTaskList: (id) => dispatch(startRemoveTaskFromTaskList(id)), 
  startAddTaskCommentToTask: (taskCommentData) => dispatch(startAddTaskCommentToTask(taskCommentData)),
  resetModal: () => dispatch(resetModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
