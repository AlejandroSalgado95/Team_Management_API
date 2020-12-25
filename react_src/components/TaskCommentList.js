import React from 'react';
import { connect } from 'react-redux';
import TaskCommentListItem from './TaskCommentListItem';


const TaskCommentList = (props) => {
   

  let showNoTaskCommentsFound = false;
  let showTaskComments = false;

  if (!props.loading && props.taskComments.length === 0)
    showNoTaskCommentsFound = true;

  if (props.taskComments.length > 0)
    showTaskComments = true;

  return (
    <div>
      {showNoTaskCommentsFound && <p>No comments</p>}
      { showTaskComments && props.taskComments.map((taskComment) => {return <TaskCommentListItem key={taskComment._id} id = {taskComment._id} content = {taskComment.content} createdOn ={taskComment.createdOn} postedBy ={taskComment.postedBy}/>})}
    </div>
  );
}

export default TaskCommentList;