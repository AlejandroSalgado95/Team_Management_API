import React from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';

export default class HomePage extends React.Component {
	
	changePageToUserList = () => {

		this.props.history.push("/users");
	}

	changePageToTaskList = () => {

		this.props.history.push("/tasks");
	}

	changePageToChat = () => {

		this.props.history.push("/home");
	}


	render(){
		return (
			<div>
				<Header />
				<p>This is whats supposed to be the home page</p>
				<button onClick = {this.changePageToChat}>Chat</button>
				<button onClick = {this.changePageToUserList}>User list</button>
				<button onClick = {this.changePageToTaskList}>Task list</button>

			</div>
		)
	}

}

