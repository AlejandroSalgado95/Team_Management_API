import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { startAddTaskToTaskList, resetModal } from '../actions/taskList';
import { startAddUserList} from '../actions/userList';
import AddTaskForm from "./TaskForm"
import AcceptModal from './CustomModal';
import Footer from './Footer'


class AddTaskPage extends React.Component {
  

  goBack = () => {
    console.log(this.props.history);
    this.props.history.goBack();
  }

  closeModal = () => {
      this.props.resetModal();
      this.props.history.goBack();
  }

  sendFormData = (task) => {
    this.props.startAddTaskToTaskList(task);
  };


  componentDidMount(){
    this.props.resetModal();
    this.props.startAddUserList();

  }


  render() {

    return (
      <div>
        <Header/>
        <a onClick = {this.goBack} className="btn btn-large left" style={{margin:"10px"}} ><i className="material-icons left">arrow_back</i>Back</a>
        <AddTaskForm isAddForm = {true} sendFormData={this.sendFormData} users={this.props.userList.users}/>
        <Footer/>
        <AcceptModal openModal={this.props.taskList.modal} closeModal={this.closeModal}>
          <a onClick = {this.closeModal} className="btn-large brand-color right" style={{margin:"10px",  display: "block"}} >Accept</a>
        </AcceptModal>
      </div>

    );
  }
}


const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  taskList: state.taskList,
  userList: state.userList
});

const mapDispatchToProps = (dispatch) => ({
  startAddTaskToTaskList: (task) => dispatch(startAddTaskToTaskList(task)),
  startAddUserList: () => dispatch(startAddUserList()),
  resetModal: () => dispatch(resetModal())
});

export default connect(mapStateToProps,mapDispatchToProps)(AddTaskPage);
