import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css'

//PENDIENTE
//1.- QUE AL AGREGAR UNA TASK SE GUARDE LA DESCRIPTION
//2.- QUE AL AGREGAR UNA TASK EL VALOR DEFAULT DE ASSIGNEDTOUSER SEA EL PRIMER USUARIO DISPONIBLE DEL ARRAY DE USERS

class TaskForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      _id:props._id,
      name: props.name,
      description: props.description,
      assignedToUser: (props.assignedToUser)? props.assignedToUser._id : undefined,
      status: props.status,
      error:undefined
    };
  }



  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
    
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
    
  };


  onAssignedToUserChange = (e) => {
    console.log ("assignedToUser:",e.target.value);
    const assignedToUser = e.target.value;
    this.setState(() => ({ assignedToUser }));
    
  };


  onStatusChange = (e) => {
    const status = e.target.value;
    this.setState(() => ({ status }));
    
  };


  checkForError = () => {
    
    let error = undefined; 
    if (this.props.isAddForm){
      if (!this.state.name || !this.state.description || !this.state.assignedToUser) 
        error = 'Please fill all the fields';

    } else if (this.props.isEditForm){

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
        this.setState(() => ({ error: undefined }));
        this.props.sendFormData({
          _id:this.state._id,
          name: this.state.name,
          description: this.state.description,
          assignedToUser: this.state.assignedToUser,
          status: this.state.status
        });
    }
  };

  componentDidUpdate(){

      let elems = document.querySelectorAll('select');
      M.FormSelect.init(elems, {});

  }



  render() {

    const user_type = this.props.session.profile.user_type;
    let showName = true;
    let showDescription = true;
    let showAssignedToUser = true;
    let showStatus = true;

    if (this.props.isAddForm){
      showStatus = false;
      
      if (this.props.users.length > 0){
        //console.log(this.props.users);
      }

    } else if (this.props.isEditForm){
      showStatus = true;
      if (user_type != "admin"){
        showName = false;
        showDescription = false;
        showAssignedToUser = false;
      }
    }

    return (
      <div style={{ marginTop:"80px", marginBottom:"70px"}} >
        {this.state.error && <div className="center"><p className="s-font-size">{this.state.error}</p></div>}
        <form onSubmit={this.onSubmit}>
          {showName && <div className="row"><div className = "col s4 offset-s2 " style={{width:"70%"}} ><input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onNameChange}
          /></div></div>}
          {showDescription && <div className="row"><div className = "col s4 offset-s2 " style={{width:"70%"}} ><input
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          /></div></div>}
          {showAssignedToUser &&  <div className="row"><div className="input-field col s4 offset-s2 " style={{width:"70%"}} ><select onChange = {this.onAssignedToUserChange} >
            <option value = ""  disabled selected>None</option>
            {
              this.props.users.map((user)=> {
                  //const isSelected = (user._id == this.state.assignedToUser)?"selected":"";
                  if (user._id == this.state.assignedToUser){
                    console.log("found the default option");
                    return (<option value = {user._id} selected >{user.name}</option>);
                  }
                  else {
                    console.log("not the option");
                    return (<option value = {user._id} >{user.name}</option>);
                  }
                })

            }
          </select><label>Assigned to</label></div></div>}
          {showStatus &&<div className="row"><div className = "input-field  col  s4 offset-s2 " style={{width:"70%"}} ><select onChange = {this.onStatusChange} >
            {(this.props.status)?(<option value = "true"  selected>done</option>):(<option value = "true" >done</option>)}
            {(!this.props.status)?(<option value = "false"  selected>pending</option>):(<option value = "false" >pending</option>)}
          </select><label>Status</label></div></div>}
          <div className="center" style={{marginTop:"25px"}}><a onClick={this.onSubmit}className="btn btn-large brand-color" style={{backgroundColor: "#112e47", color:"white"}}>{this.props.isAddForm?"Create task":"Update task"}</a></div>

        </form>
      </div>
    );
  }

}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  session: state.session
});

export default connect(mapStateToProps, null)(TaskForm);


