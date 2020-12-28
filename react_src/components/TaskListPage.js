import React from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import TaskList from './TaskList';
import { startAddTaskList } from '../actions/tasklist';
import { connect } from 'react-redux';

  

class TaskListPage extends React.Component {


	goBack = () => {
		console.log(this.props.history);
	    this.props.history.goBack();
	}

	componentDidMount() {
     	this.props.startAddTaskList();
    }


	render(){
		return(
			  <div>
			  	<Header/>
			    <button onClick = {this.goBack}>Back</button>
			    {this.props.taskList.error && <p>{this.props.taskList.error}</p>}
        		{this.props.taskList.loadingTaskList && <p>loading task list...</p> }
			    {!this.props.taskList.loadingTaskList && <TaskList tasks = {this.props.taskList.tasks} loading = {this.props.taskList.loadingTaskList}/>}
			  </div>
		);
	}

}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  taskList: state.taskList
});


const mapDispatchToProps = (dispatch) => ({
  startAddTaskList: () => dispatch(startAddTaskList())
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskListPage);

