import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { startAddMessageList , resetModal, resetStateToDefault} from '../actions/messageList';
import MessageList from './MessageList'
import MessageForm from "./SendForm"
import Footer from './Footer'
class ChatPage extends React.Component {

	constructor() {
        super()
        this.messageListContainer = React.createRef();
        this.gettingNewMessages = false;
		this.lastMessageId = undefined;

    }

    chatGotScrolled = () => {

    	console.log("chatGotScrolled");
    	let newMessagesLeft = (this.props.messageList.messages[0]._id === this.lastMessageId)? false : true;
/*
    	if (this.messageListContainer.current.scrollTop == 0){
    		console.log("lastMessageId:",this.lastMessageId);
    		console.log("actualLastMessageId", this.props.messageList.messages[0]._id);
    	}
 */

    	if ( newMessagesLeft && !this.gettingNewMessages && this.messageListContainer.current.scrollTop == 0){

    		this.gettingNewMessages = true;
     		this.props.startAddMessageList(this.props.messageList.messages[0]._id);

    	}


    }

	componentDidMount() {
     	this.props.startAddMessageList();
    }

    componentWillUnmount(){
    	this.props.resetStateToDefault();
    }



     componentDidUpdate (prevProps) {
    	console.log("updated");
    	//Move the scroll to the bottom the first time you get messages
    	if (prevProps.messageList.messages.length === 0)
			this.messageListContainer.current.scrollTop = this.messageListContainer.current.scrollHeight;
    	
    	//Save the id of the last message you got the previous time you asked for messages
		if (prevProps.messageList.messages.length > 0)
			this.lastMessageId = prevProps.messageList.messages[0]._id;

		this.gettingNewMessages = false;
	  }



	render() {
		
		return (
			<div>
				<Header/>
				{this.props.messageList.loadingMessageList && <div className="center"><p className="m-font-size">loading messages...</p></div>}
				<center>
          <div ref = {this.messageListContainer} onScroll = {this.chatGotScrolled} className = "message-list-container" style={{margin:"100px",marginBottom:"20px",marginTop:"50px"}}>
  					<MessageList messages = {this.props.messageList.messages}/>
  				</div>
        </center>
        <MessageForm isChat = {true}/>
        <Footer/>
			</div>
		);
	}
}



const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  messageList: state.messageList
});


const mapDispatchToProps = (dispatch) => ({
  startAddMessageList: (lastMessageId) => dispatch(startAddMessageList(lastMessageId)),
  resetStateToDefault: ()=>dispatch(resetStateToDefault()),
  resetModal: () => dispatch(resetModal())

});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
