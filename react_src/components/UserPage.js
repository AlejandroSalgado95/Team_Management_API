import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {startAddUserById, startAddTasksOfUser } from '../actions/user';
import {startRemoveUserFromUserList, resetModal } from '../actions/userList';
import { deleteSession, notLoadingSession } from '../actions/session';
import TaskList from './TaskList';
import CustomModal from './CustomModal';
import Footer from './Footer'


export class UserPage extends React.Component {

	  state = {
	  	deleteModal: undefined
	  }

	  showDeleteModal = () =>{
	  	const deleteModal = "Do you want to delete this user?";
    	this.setState(() => ({ deleteModal }));
	  }

	  closeDeleteModal = () =>{
    	this.setState(() => ({ deleteModal: undefined }));
	  }
	
	  closeModal = () => {
	    
	    const profileId = this.props.session.profile._id
	    const deletedUserId = this.props.match.params.id;
	    const shouldLogOut = (profileId == deletedUserId )? true: false;
	    this.props.resetModal();
	    if (shouldLogOut){
	      this.props.history.push("/login");
	      this.props.deleteSession();
	      this.props.notLoadingSession();
	    } else {
	    	this.props.history.goBack();
	    }
	  }

	  
	  deleteUser = () =>{
	  	const id = this.props.match.params.id;
	  	this.props.startRemoveUserFromUserList(id);
	  	this.closeDeleteModal();
	  }

	  goBack = () => {
		console.log(this.props.history);
		this.props.history.goBack();
	  }

	  goToEditPage = () => {
	  	this.props.history.push(`/users/${this.props.match.params.id}/edit`)
	  }

	 refreshData(){
     	const user = {id: this.props.match.params.id};
     	console.log(user.id);
     	this.props.startAddUserById(user);
     	this.props.startAddTasksOfUser(user);

	 }

     componentDidMount() {
     	this.props.resetModal();
     	this.closeDeleteModal();

     	const user = {id: this.props.match.params.id};
     	console.log(user.id);
     	this.props.startAddUserById(user);
     	this.props.startAddTasksOfUser(user);

      }

     componentDidUpdate (prevProps) {
    	console.log("updated");
    	if (prevProps.location.key !== this.props.location.key) {
    		this.refreshData();
   		 }

	  }


	render(){


	    const user_type = this.props.session.profile.user_type;
		const profileId = this.props.session.profile._id;

    	let showEdit = ((user_type === "admin") || (profileId === this.props.match.params.id))? true : false;
		let showGoBack = (profileId === this.props.match.params.id)? false : true;
		let showDelete = ((user_type === "admin") || (profileId === this.props.match.params.id))? true : false;

		return (
			<div>
				<Header/>
				{showGoBack?(<a onClick = {this.goBack} className="btn btn-large left" style={{margin:"10px"}} ><i className="material-icons left">arrow_back</i>Back</a>):(<a className="btn btn-large left" style={{margin:"10px"}} disabled ><i className="material-icons left">arrow_back</i>Back</a>)}
				{showEdit?(<a onClick = {this.goToEditPage} className="btn btn-large right" style={{margin:"10px"}} ><i className="material-icons left">edit</i>Edit</a>):(<a  className="btn btn-large right" style={{margin:"10px"}} disabled ><i className="material-icons left">edit</i>Edit</a>)}
				{showDelete?(<div className="center"><a onClick = {this.showDeleteModal} className="btn btn-large center red darken-4" style={{margin:"10px"}} ><i className="material-icons left">warning</i>Delete</a></div>):(<div className="center"><a className="btn btn-large center red darken-4" style={{margin:"10px"}} disabled><i className="material-icons left">warning</i>Delete</a></div>)}
				{this.props.user.loadingUser && <div className="center"><p>loading user...</p></div>}
				{this.props.user.errorUser && <p>{this.props.user.errorUser}</p>}
				{!this.props.user.loadingUser && <div style={{marginTop:"50px"}}>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Account: {this.props.user.account} </p></div></div>
					<div className="row" style={{margin:"0px"}}><div className="divider col s10 offset-s1" ></div></div>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Name: {this.props.user.name}</p></div></div>
					<div className="row" style={{margin:"0px"}}><div className="divider col s10 offset-s1" ></div></div>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>Role: {this.props.user.role}</p></div></div>
					<div className="row" style={{margin:"0px"}}><div className="divider col s10 offset-s1" ></div></div>
					<div className="row" style={{margin:"0px"}}><div className = "col s8 offset-s1" ><p className="s-m-font-size" style={{margin:"10px"}}>User type: {this.props.user.user_type}</p></div></div>
				</div>}
				{this.props.user.errorTasks && <p>{this.props.user.errorTasks}</p>}
				{this.props.user.loadingUser && <div className="center"><p>loading tasks...</p></div>}
				<TaskList tasks = {this.props.user.tasks} loading = {this.props.user.loadingUser}/>
				<Footer/>

				<CustomModal openModal={this.state.deleteModal} closeModal={this.closeDeleteModal}>
				  <a onClick = {this.deleteUser} className="btn-large red darken-4 right" style={{margin:"10px",  display: "block"}} >Delete</a>
				  <a onClick = {this.closeDeleteModal} className="btn-large brand-color right" style={{margin:"10px",  display: "block"}} >Close</a>
				</CustomModal>


				<CustomModal openModal={this.props.userList.modal} closeModal={this.closeModal}>
		          <a onClick = {this.closeModal} className="btn-large brand-color right" style={{margin:"10px",  display: "block"}} >Close</a>
				</CustomModal>

			</div>
		)

	}



}


const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  user: state.actualUser,
  session: state.session,
  userList: state.userList
});


const mapDispatchToProps = (dispatch) => ({
  startAddUserById: (user) => dispatch(startAddUserById(user)),
  startAddTasksOfUser: (user) => dispatch(startAddTasksOfUser(user)),
  startRemoveUserFromUserList: (id) => dispatch(startRemoveUserFromUserList(id)), 
  deleteSession: () => dispatch(deleteSession()),
  notLoadingSession: () => dispatch(notLoadingSession()),
  resetModal: () => dispatch(resetModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);


