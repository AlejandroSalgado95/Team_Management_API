import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';


class MessageListItem extends React.Component{
	
	formatCreationDate = (date) =>{
	 return `${date.split("T")[0]} - ${date.split("T")[1].substring(0,5)}`
	}

	goToUserPage = (id) => {
		this.props.history.push(`/users/${id}`);
	}

	render(){
		const sentBySelf = (this.props.session.profile._id==this.props.sendedBy._id)?true:false;
		return (
			<div>
			{
				sentBySelf?(
					<div className="row" style={{marginBottom:"0px"}}>
					    <div className="right" style={{minWidth:"42%",maxWidth: "80%", marginTop: "0px"}}>
							<div className="row" style={{marginBottom: "0px", height: "40px", marginRight:"10px"}}>
								<div className="col" style={{height: "40px"}}>
									<p onClick = {()=>{this.goToUserPage(this.props.sendedBy._id)}} className="s-font-size" style={{color:"#707070", textAlign:"left"}} >{this.props.sendedBy.name}</p>
								</div>
								<div className="col" style={{height: "40px"}}>
									<p className="s-font-size" style={{color:"#707070",textAlign:"left"}}>{this.formatCreationDate(this.props.date)}</p>
								</div><
							/div>
							<div class="message-arrow-up-self " style={{marginRight:"200px"}}></div>
							<p className="s-font-size message-content-self left" style={{marginLeft: "15px", marginTop: "0px", minWidth: "50%", maxWidth:"90%", textAlign:"left", paddingLeft:"10px"}}> {this.props.content}</p>
						</div>
					</div>
				)
				:(
					<div className="row" style={{marginBottom:"0px"}}>
					    <div className="left" style={{minWidth:"50%",maxWidth: "80%", marginTop: "0px"}}>
							<div className="row" style={{marginBottom: "0px", height: "40px", marginLeft:"10px"}}>
								<div className="col" style={{height: "40px"}}>
									<p onClick = {()=>{this.goToUserPage(this.props.sendedBy._id)}} className="s-font-size" style={{color:"#707070", textAlign:"left"}} >{this.props.sendedBy.name}</p>
								</div>
								<div className="col" style={{height: "40px"}}>
									<p className="s-font-size" style={{color:"#707070",textAlign:"left"}}>{this.formatCreationDate(this.props.date)}</p>
								</div><
							/div>
							<div class="message-arrow-up-other " style={{marginRight:"250px"}}></div>
							<p className="s-font-size message-content-other left" style={{marginLeft: "15px", marginTop: "0px", minWidth: "50%",  maxWidth:"90%", textAlign:"left", paddingLeft:"10px"}}> {this.props.content}</p>
						</div>
					</div>
				)

			}

			</div>
		)
	}

}

const mapStateToProps = (state, props) => ({
  session: state.session
});

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(MessageListItem);
