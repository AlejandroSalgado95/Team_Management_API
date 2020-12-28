import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { startAddUserById, startAddTasksOfUser } from '../actions/user';
import TaskList from './TaskList';

export class UserPage extends React.Component {


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


	    const user_type = sessionStorage.getItem('userType');
		const profileId = sessionStorage.getItem('profileId');

    	let showEdit = ((user_type === "admin") || (profileId === this.props.match.params.id))? true : false;
		let showGoBack = (profileId === this.props.match.params.id)? false : true;


		return (
			<div>
				<Header/>
				{showGoBack && <button onClick = {this.goBack}>Back</button>}
				{showEdit && <button onClick = {this.goToEditPage}>Edit</button>}
				{this.props.user.errorUser && <p>{this.props.user.errorUser}</p>}
				{this.props.user.errorTasks && <p>{this.props.user.errorTasks}</p>}
				{this.props.user.loadingUser && <p>loading user...</p>}
				{!this.props.user.loadingUser && <p>account: {this.props.user.account} </p> }
				{!this.props.user.loadingUser && <p>name: {this.props.user.name}</p>}
				{!this.props.user.loadingUser && <p>role: {this.props.user.role}</p>}
				{!this.props.user.loadingUser && <p>user_type: {this.props.user.user_type}</p>}
				{this.props.user.loadingUser && <p>loading tasks...</p>}
				<TaskList tasks = {this.props.user.tasks} loading = {this.props.user.loadingUser}/>
			</div>
		)

	}



}


const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  user: state.actualUser
});


const mapDispatchToProps = (dispatch) => ({
  startAddUserById: (user) => dispatch(startAddUserById(user)),
  startAddTasksOfUser: (user) => dispatch(startAddTasksOfUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);


