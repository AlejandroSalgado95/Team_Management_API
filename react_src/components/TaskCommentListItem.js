import React from 'react';
import { Link } from 'react-router-dom';



class TaskCommentListItem extends React.Component{ 

	formatCreationDate = (date) => (date.split("T")[0])

	render(){
		return (
		    <li className="collection-item avatar" >
		    	<div className="row">
		    		<div className = "col s4 " >
			    		{this.props.postedBy.name && <p className="s-font-size" style={{color:"#707070"}}>{this.props.postedBy.name}</p>}
			    	</div>
			    	<div className = "col s4" >
				    	{this.props.createdOn && <p className="s-font-size" style={{color:"#707070"}}>{this.formatCreationDate(this.props.createdOn)}</p>}
			    	</div>
			    </div>
			    <div className="row">
			    	<div className = "col s4" >
			    		{this.props.content && <p className="s-font-size"> {this.props.content}</p>}
					</div>
				</div>
			</li>
		)
	
	}
}
	



export default TaskCommentListItem