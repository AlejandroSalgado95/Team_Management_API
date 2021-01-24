import React from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import TaskList from './TaskList';
import { startAddTaskList } from '../actions/tasklist';
import { connect } from 'react-redux';
import Footer from './Footer'
  

class TaskListPage extends React.Component {


	goBack = () => {
		console.log(this.props.history);
	    this.props.history.goBack();
	}

	goToAddTask = () => {
		console.log(this.props.history);
	    this.props.history.push("/tasks/add");
	}


	componentDidMount() {
     	this.props.startAddTaskList();
    }


	render(){
		const user_type = this.props.session.profile.user_type;
    	const showAddTask = (user_type === "admin")? true : false;

		return(
			  <div>
			  	<Header/>
        		<a onClick = {this.goBack} className="btn btn-large left" style={{margin:"10px"}} ><i className="material-icons left">arrow_back</i>Back</a>
			    {showAddTask && <a onClick = {this.goToAddTask} className="btn btn-large right" style={{margin:"10px"}}><i className="material-icons left">add</i>Add task</a>}
			    {this.props.taskList.error && <p>{this.props.taskList.error}</p>}
        		{this.props.taskList.loadingTaskList && <div className="center" style={{marginTop:"100px"}}><p className="m-font-size">loading task list...</p></div> }
			    {!this.props.taskList.loadingTaskList && <TaskList tasks = {this.props.taskList.tasks} loading = {this.props.taskList.loadingTaskList}/>}
			  	<Footer/>
			  </div>
		);
	}

}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  taskList: state.taskList,
  session: state.session
});


const mapDispatchToProps = (dispatch) => ({
  startAddTaskList: () => dispatch(startAddTaskList())
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskListPage);

