import React from 'react';
import { Link } from 'react-router-dom';


const TaskCommentListItem = (props) =>  (
	    <div>
	    	{props.postedBy.name && <p>Posted by: {props.postedBy.name}</p>}
		    {props.createdOn && <p>Created on: {props.createdOn}</p>}
		    {props.content && <p>Content: {props.content}</p>}
		</div>
)
	



export default TaskCommentListItem