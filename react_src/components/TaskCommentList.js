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
      {showNoTaskCommentsFound && <p className="m-font-size center" style={{color:"#3fa5b5"}}>No comments</p>}
      { showTaskComments && <div style={{ margin:"100px",height:"500px",overflow:" scroll"}}>
        <ul class="collection">
          {props.taskComments.map((taskComment) => {return <TaskCommentListItem key={taskComment._id} id = {taskComment._id} content = {taskComment.content} createdOn ={taskComment.createdOn} postedBy ={taskComment.postedBy}/>})}
        </ul>
      </div>
      }
    </div>
  );
}

export default TaskCommentList;