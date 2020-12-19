import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import ChatPage from '../components/ChatPage';
import NotFoundPage from '../components/NotFoundPage';



const AppRouter = () => (

	<BrowserRouter>
		<div>
			<Header/>
			<Switch>
				<Route path = "/" component = {HomePage} exact = {true}/>	
				<Route path = "/chat" component = {ChatPage} />
				<Route component = {NotFoundPage}/>	
			</Switch>
		</div>
	</BrowserRouter>

)

export default AppRouter;

