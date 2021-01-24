import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { startEditTaskFromTaskList, resetModal } from '../actions/taskList';
import { startAddUserList} from '../actions/userList';
import EditTaskForm from './TaskForm'
import AcceptModal from './CustomModal';
import Footer from './Footer'

 class EditTaskPage extends React.Component {


	  goBack = () => {
		console.log(this.props.history);
		this.props.history.goBack();
	  }

	  sendFormData = (task) => {
	    this.props.startEditTaskFromTaskList(task);
	  };


	  closeModal = () => {
	    
	    const shouldGoBack = (this.props.taskList.modal == "Updated task successfully")? true: false;
	    this.props.resetModal();
	    if (shouldGoBack)
	      this.props.history.goBack();
	  }


     componentDidMount() {
     	//const user = {id: this.props.match.params.id};
     	this.props.resetModal();
   		this.props.startAddUserList();

      }



	render(){
     	const taskId = this.props.match.params.id;
		const taskToEdit = this.props.taskList.tasks.filter((task)=>task._id == taskId)[0];
		console.log(taskToEdit);
		return (
			<div>
				<Header/>
        		<a onClick = {this.goBack} className="btn-large brand-color left" style={{margin:"10px",  display: "block"}} ><i className="material-icons left">arrow_back</i>Back</a>
				<EditTaskForm isEditForm = {true} sendFormData = {this.sendFormData} users={this.props.userList.users} {...taskToEdit}></EditTaskForm>
				<Footer/>
				<AcceptModal openModal = {this.props.taskList.modal} closeModal = {this.closeModal}>
		          <a onClick = {this.closeModal} className="btn-large brand-color right" style={{margin:"10px",  display: "block"}} >Accept</a>
				</AcceptModal>
			</div>
		)

	}


}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  taskList: state.taskList,
  userList: state.userList
});


const mapDispatchToProps = (dispatch) => ({
  startEditTaskFromTaskList: (task) => dispatch(startEditTaskFromTaskList(task)),
  startAddUserList: () => dispatch(startAddUserList()),
  resetModal: () => dispatch(resetModal())

});

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskPage);




