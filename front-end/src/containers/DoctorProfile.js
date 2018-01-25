import React, { Component } from 'react';
import DoctorProfileResults from '../components/DoctorProfileResults'
import DataTables from 'material-ui-datatables';


import { connect } from 'react-redux';
class DoctorProfile extends Component{


	componentDidUpdate(){
		console.log(this.props.drData.data)//if after refresh this state is empty - we'll use sessionStorage
		if (this.props.drData.data.length !== 0){
			let doctors = this.props.drData.data.doctors;
			console.log("from SearchResults", doctors);
		}
		
	}

	

	render(){
		console.log(sessionStorage)
		console.log(this.props.drData.data.doctors);//if after refresh this state is empty - we'll use sessionStorage
		if (this.props.drData.data.length !== 0){
			var doctors = this.props.drData.data.doctors;
			var index = this.props.drData.data.doctors.id
		}else{
			let doctorsInfo = sessionStorage.getItem('doctors');
			doctors = JSON.parse(doctorsInfo);//somehow we loose state - so I use localstorage
			console.log("from sessionStorage ", doctors, typeof(doctors))
			console.log(doctors[0].photo)
		}
		
		const locations = doctors.length;
		
		return(
				<div className="results-wrapper">
					<div className="row">
						<div className="col s7">
							<div className="search-doctor-results"></div>

								
								<DoctorProfileResults index={index} results={doctors} uid = {doctors.uid}  />
								
							</div>
					</div>
				</div>
				
		)
	}
}

	function mapStateToProps(state){
	 	// console.log(state);
	 	return{
	 		drData: state.searchResults
	 		
	 	}
	 	
	}

	// function mapDispatchToProps(dispatch){
	// 	return bindActionCreators({

	// 	}, dispatch)
	// }


export default connect(mapStateToProps)(DoctorProfile);