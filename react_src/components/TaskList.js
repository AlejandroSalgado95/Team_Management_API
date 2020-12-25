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
      {showNoTasksFound && <p>No tasks found</p>}
      {showTasks && props.tasks.map((task) => {return <TaskListItem key={task._id} id = {task._id} name = {task.name} assignedToUser ={task.assignedToUser} creationDate ={task.creationDate} status = {task.status} />;})}
    </div>
  );
}


export default TaskList;
