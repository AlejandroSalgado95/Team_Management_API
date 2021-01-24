import React from 'react';
import MessageListItem from './MessageListItem';



 const MessageList = (props) => {

  let showMessages = false;

  if (props.messages.length > 0)
    showMessages = true;
  
  return(
    <div>
      {showMessages && props.messages.map((message) => {return (<MessageListItem key={message._id} id = {message._id} content = {message.content} sendedBy = {message.sendedBy} date = {message.date}/>) ;})}
    </div>
  );
}


export default MessageList;
