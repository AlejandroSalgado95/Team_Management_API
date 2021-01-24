import React from 'react';
import TaskListItem from './TaskListItem';



 const TaskList = (props) => {

  let showNoTasksFound = false;
  let showTasks = false;

  if (!props.loading && props.tasks.length === 0)
    showNoTasksFound = true;

  if (props.tasks.length > 0)
    showTasks = true;
  
  return(
    <div>
      {showNoTasksFound &&  <p className="m-font-size center" style={{color:"#3fa5b5"}}>No tasks found</p>}
      {showTasks && <div style={{ margin:"100px",height:"500px",overflow:" scroll"}}>
        <ul class="collection">
          {showTasks && props.tasks.map((task) => {return <TaskListItem key={task._id} id = {task._id} name = {task.name} description = {task.description} createdBy = {task.createdBy} assignedToUser ={task.assignedToUser} creationDate ={task.creationDate} status = {task.status} />;})}
        </ul>
      </div>}
    </div>
  );
}


export default TaskList;
