import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { startEditUserFromUserList, resetModal } from '../actions/userList';
import EditUserForm from './UserForm'
import AcceptModal from './CustomModal';
import Footer from './Footer'

 class EditUserPage extends React.Component {


	  goBack = () => {
		console.log(this.props.history);
		this.props.history.goBack();
	  }

	  sendFormData = (user) => {
	  	const isProfile = (user._id == this.props.session.profile._id)?true:false;
	    this.props.startEditUserFromUserList({...user,isProfile});
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
		let userToEdit = this.props.userList.users.filter((user)=>user._id == userId)[0];
		console.log(userToEdit);
		if (!userToEdit){
			userToEdit = this.props.session.profile;
		}


		return (
			<div>
				<Header/>
        		<a onClick = {this.goBack} className="btn-large brand-color left" style={{margin:"10px",  display: "block"}} ><i className="material-icons left">arrow_back</i>Back</a>
				<EditUserForm isEditForm = {true} sendFormData = {this.sendFormData} {...userToEdit}></EditUserForm>
				<Footer/>
				<AcceptModal openModal = {this.props.userList.modal} closeModal = {this.closeModal}>
					<a onClick = {this.closeModal} className="btn-large brand-color right" style={{margin:"10px",  display: "block"}} >Accept</a>
				</AcceptModal>

			</div>
		)

	}


}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  userList: state.userList,
  session: state.session
});


const mapDispatchToProps = (dispatch) => ({
  startEditUserFromUserList: (user) => dispatch(startEditUserFromUserList(user)),
  resetModal: () => dispatch(resetModal())

});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);




