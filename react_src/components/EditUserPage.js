import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { startEditUserFromUserList, resetModal } from '../actions/userList';
import EditUserForm from './UserForm'
import Modal from 'react-modal';

 class EditUserPage extends React.Component {


	  goBack = () => {
		console.log(this.props.history);
		this.props.history.goBack();
	  }

	  sendFormData = (user) => {
	    this.props.startEditUserFromUserList(user);
	  };


	  closeModal = () => {
	    
	    const shouldGoBack = (this.props.userList.modal == "Updated user successfully")? true: false;
	    this.props.resetModal();
	    if (shouldGoBack)
	      this.props.history.goBack();
	  }


     componentDidMount() {
     	//const user = {id: this.props.match.params.id};
     	this.props.resetModal();

      }



	render(){
     	const userId = this.props.match.params.id;
		const userToEdit = this.props.userList.users.filter((user)=>user._id == userId)[0];
		console.log(userToEdit);
		return (
			<div>
				<Header/>
				<button onClick = {this.goBack}>Back</button>
				<p>This is the edit page for user {this.props.match.params.id}</p>
				<EditUserForm isEditForm = {true} sendFormData = {this.sendFormData} {...userToEdit}></EditUserForm>
				<Modal
		            isOpen={this.props.userList.modal}
		            onRequestClose={this.closeModal}
		          >
		          {this.props.userList.modal}
		          <button onClick={this.closeModal}>close</button>

		        </Modal>

			</div>
		)

	}


}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  userList: state.userList
});


const mapDispatchToProps = (dispatch) => ({
  startEditUserFromUserList: (user) => dispatch(startEditUserFromUserList(user)),
  resetModal: () => dispatch(resetModal())

});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);




