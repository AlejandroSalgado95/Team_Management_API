import React from 'react';
import { connect } from 'react-redux';
import { startAddSessionByLogin , resetModal, notLoadingSession} from '../actions/session';
import LoginForm from "./LoginForm"
import Modal from 'react-modal';

class LoginPage extends React.Component {
  
  sendFormData = (profile) => {
    this.props.startAddSessionByLogin(profile);
    //this.props.history.push('/');
  };

  closeModal = () => {
    this.props.resetModal();
  }

  componentDidMount(){
    this.props.resetModal();
    this.props.notLoadingSession();

  }


  render() {
    
    if (this.props.session.hasSession)
      this.props.history.push('/home');

    return (
      <div>
        <div className="center">
        <img src={`${window.location.origin}/img/logo.png`} style={{marginTop:"15px"}} width="60" height="60"></img>
        <p className="s-font-size" style={{color:"#112e47",margin:"0px"}}>Introduce credentials </p></div>
        <LoginForm sendFormData={this.sendFormData}/>
        <Modal
            isOpen={this.props.session.modal}
            onRequestClose={this.closeModal}
          >
          
          {this.props.session.modal}
          <button onClick={this.closeModal}>close</button>

        </Modal>

      </div>

    );
  }
}

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  session: state.session
});


const mapDispatchToProps = (dispatch) => ({
  startAddSessionByLogin: (profile) => dispatch(startAddSessionByLogin(profile)),
  notLoadingSession: ()=>dispatch(notLoadingSession()),
  resetModal: () => dispatch(resetModal())

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
