import React, { Component } from 'react';
// import jquery from 'jquery';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import GetDoctor from '../actions/GetDoctor';


class SavedDoctor extends Component{



    constructor(props){

        super(props);
        this.state = {
            name : ''
        }

    }

componentWillReceiveProps(newProps){
  if(newProps.add.msg === "ok"){
    // usr has logged in. Move them on
    newProps.history.push('/GetDoctor');
    }
  }

componentDidMount(){
	
this.props.getDoctor({drID: this.props.match.params.drID})	
 
	

	console.log(this.props.match.params)
}

   



	render(){
  
		
        console.log("RIIIIIIMEEXXXX");
        console.log(this.props.get);
        console.log("REIIIIIMEEXXXX");

     
        



        return(

        	<div className="container profile-box z-depth-4">
        
    <div className="page-header">
        <h4>{this.props.get.drName}</h4>
        </div>
        <div className="col s12">
        <div className="row">
           
           
              
                <div className="col s5 offset-s2">
               <table>
            
            	<tbody>
                   
            	<tr>
            		<th>Practice:</th>
            		<td>{this.props.get.drPractice}</td>
            		</tr>          
            	<tr>
                	<th>Address:</th>
   					<td>{this.props.get.drAddress}<br />{this.props.get.drCity}, {this.props.get.drState}<br />{this.props.get.drZip}</td>
            	</tr>
            	
            	<tr>
                    <th>Phone:</th>
                    <td>{this.props.get.drPhone}</td>

            	</tr>



                
               
            	
 				</tbody>
    		</table>
            </div>
             <div className="col s3">
                <img id="drPhoto" src = {this.props.get.drPhoto} />
            </div>
            </div>
            
    		
    		
    		</div>

    
</div>

 
        	
			
		)
	}
}
function mapStateToProps(state){
  return{
    auth: state.auth,
    add: state.add,
    get: state.get
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getDoctor: GetDoctor

  }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(SavedDoctor);
