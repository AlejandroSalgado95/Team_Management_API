import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import ChatPage from '../components/ChatPage';
import TaskListPage from '../components/TaskListPage';
import TaskPage from '../components/TaskPage';
import AddTaskPage from '../components/AddTaskPage';
import EditTaskPage from '../components/EditTaskPage';
import UserListPage from '../components/UserListPage';
import UserPage from '../components/UserPage';
import AddUserPage from '../components/AddUserPage';
import EditUserPage from '../components/EditUserPage';
import NotFoundPage from '../components/NotFoundPage';
import SplashScreenPage from '../components/SplashScreenPage'



const AppRouter = () => (

	<BrowserRouter>
		<div>
			<Switch>
				<Route path = "/" component = {SplashScreenPage} exact = {true}/>
				<Route path = "/login" component = {LoginPage} />
				<Route path = "/home" component = {HomePage} />
				<Route path = "/chat" component = {ChatPage} />
				<Route path = "/users" component = {UserListPage} exact = {true}/>
				<Route path = "/users/add" component = {AddUserPage} />
				<Route path = "/users/:id" component = {UserPage} exact = {true} />
				<Route path = "/users/:id/edit" component = {EditUserPage} />
				<Route path = "/tasks" component = {TaskListPage} exact = {true} />
				<Route path = "/tasks/add" component = {AddTaskPage}  />
				<Route path = "/tasks/:id" component = {TaskPage} exact = {true}/>
				<Route path = "/tasks/:id/edit" component = {EditTaskPage} />
				<Redirect to='/' />
				<Route component = {NotFoundPage}/>	
			</Switch>
		</div>
	</BrowserRouter>

)

export default AppRouter;

