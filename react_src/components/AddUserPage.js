import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { startAddUserToUserList, resetModal } from '../actions/userList';
import AddUserForm from "./UserForm"
import Modal from 'react-modal';

class AddUserPage extends React.Component {
  

  goBack = () => {
    console.log(this.props.history);
    this.props.history.goBack();
  }

  closeModal = () => {
    
    const shouldGoBack = (this.props.userList.modal == "The provided account already exists!")? false: true;
    this.props.resetModal();
    if (shouldGoBack)
      this.props.history.goBack();
  }

  sendFormData = (user) => {
    this.props.startAddUserToUserList(user);
  };


  componentDidMount(){
    this.props.resetModal();

  }


  render() {

    return (
      <div>
        <Header/>
        <button onClick = {this.goBack}>Back</button>
        <AddUserForm isAddForm = {true} sendFormData={this.sendFormData}/>
        <Modal
            isOpen={this.props.userList.modal}
            onRequestClose={this.closeModal}
          >
          {this.props.userList.modal}
          <button onClick={this.closeModal}>close</button>

        </Modal>
      </div>

    );
  }
}


const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  userList: state.userList
});

const mapDispatchToProps = (dispatch) => ({
  startAddUserToUserList: (user) => dispatch(startAddUserToUserList(user)),
  resetModal: () => dispatch(resetModal())
});

export default connect(mapStateToProps,mapDispatchToProps)(AddUserPage);
