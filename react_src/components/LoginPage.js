import React from 'react';
import { connect } from 'react-redux';
import { startAddSessionByLogin , resetModal} from '../actions/session';
import LoginForm from "./LoginForm"
import Modal from 'react-modal';

export class LoginPage extends React.Component {
  
  sendFormData = (profile) => {
    this.props.startAddSessionByLogin(profile);
    //this.props.history.push('/');
  };

  closeModal = () => {
    this.props.resetModal();
  }

  componentDidMount(){
    this.props.resetModal();

  }


  render() {
    
    if (this.props.session.hasSession)
      this.props.history.push('/home');

    return (
      <div>
        {this.props.session.loadingSession && <p>loading...</p>}
        <h1>Introduce credentials </h1>
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
  resetModal: () => dispatch(resetModal())

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
