import React from 'react';

class TaskCommentForm extends React.Component {

  state = {
    content: "",
    error: undefined
  };
  

  onContentChange = (e) => {
    const content = e.target.value;
    this.setState(() => ({ content }));
  };


  checkForError = () => {
    
    let error = undefined; 

    if (!this.state.content) {
        error = 'Please fill all the fields';

    } 

    return error;
  }


  onSubmit = (e) => {
    e.preventDefault();
    
    let error = undefined;

    error = this.checkForError();
    
    if (error){
      this.setState(() => ({ error}));
    } else {
        const content = this.state.content;
        this.setState(() => ({ error: undefined }));
        this.props.insertTaskComment(content);
    }
    console.log("form was sent");
  };



  render() {


    return (
      <div >
        {this.state.error && <div className="center"><p className="s-font-size">{this.state.error}</p></div>}
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className = "col s7 offset-s2">
              <input
                type="text"
                placeholder="Content"
                value={this.state.content}
                onChange={this.onContentChange}
              />
            </div>
            <div className = "col s2">
            {this.props.isChat?
              (<a onClick = {this.onSubmit} className="btn btn-large left" style={{margin:"10px"}} disabled><i className="material-icons left">send</i>Send</a>)
              :
              (<a onClick = {this.onSubmit} className="btn btn-large left" style={{margin:"10px"}}><i className="material-icons left">send</i>Send</a>)
            }
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default TaskCommentForm;


