import React from 'react';
import Header from './Header';
import Footer from './Footer';

import {Link} from 'react-router-dom';
import M from 'materialize-css'

export default class HomePage extends React.Component {
	
	changePageToUserList = () => {

		this.props.history.push("/users");
	}

	changePageToTaskList = () => {

		this.props.history.push("/tasks");
	}

	changePageToChat = () => {

		this.props.history.push("/chat");
	}


	render(){
		return (
			<div>
				  <Header />

				  <div className="row center" style={{  margin: "50px"}}>
				    
				    <div className="col s3 offset-s2">
				      <div className="card-panel teal center"  onClick = {this.changePageToChat}>
  						<i className="large material-icons">chat</i>
				        <p className="white-text m-font-size">Chat</p>
				      </div>
				    </div>

				    <div className="col s3">
				      <div className="card-panel teal center" onClick = {this.changePageToUserList}>
  						<i className="large material-icons">view_list</i>
				        <p className="white-text m-font-size">User List</p>
				      </div>
				    </div>


				    <div className="col s3">
				      <div className="card-panel teal center" onClick = {this.changePageToTaskList}>
  						<i className="large material-icons">format_list_numbered</i>
				        <p className="white-text m-font-size">Task List</p>
				      </div>
				    </div>

				  </div>

				  <Footer/>
			</div>
		)
	}

}

