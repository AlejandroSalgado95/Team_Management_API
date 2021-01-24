import React from 'react';
import M from 'materialize-css'


const Footer = () =>  {

	return(
		  <div className="footer-copyright brand-color" style={{height:"150px",  display: "block", marginBottom:"0px"}}>
            	<center>
            		<div >
            			<a href="https://github.com/AlejandroSalgado95/Team_Management_API">
		            		<img src ={`${window.location.origin}/img/github-icon-2.png`}  className="footer-image"></img>
		            	</a>
		            </div>
		       		<p className="s-font-size" style={{color:"white", marginBottom:"0px", marginTop:"0px"}}>Alex Salgado</p>
        		</center>
          </div>

	)

}

export default Footer;
