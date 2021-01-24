import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { startAddUserToUserList, resetModal } from '../actions/userList';
import AddUserForm from "./UserForm"
import AcceptModal from './CustomModal';
import Footer from './Footer';



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
        <a onClick = {this.goBack} className="btn-large brand-color left" style={{margin:"10px",  display: "block"}} ><i className="material-icons left">arrow_back</i>Back</a>
        <AddUserForm isAddForm = {true} sendFormData={this.sendFormData}/>
        <Footer/>
        <AcceptModal openModal={this.props.userList.modal} closeModal={this.closeModal} >
          <a onClick = {this.closeModal} className="btn-large brand-color right" style={{margin:"10px",  display: "block"}} >Accept</a>
        </AcceptModal>
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
