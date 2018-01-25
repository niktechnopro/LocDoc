import React, { Component } from 'react';
import DoctorResults from '../components/DoctorResults'
import DoctorMap from '../components/DoctorMap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectMarker from '../actions/SelectMarker';


class SearchResults extends Component{
	constructor(){
		super()
		this.hover = this.hover.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.mouseAction = this.mouseAction.bind(this);
	}

	mouseAction(info){
		console.log(info);
		this.props.mouseMarker(info);
	}


	onMouseOut(id){
		console.log("mouse moved out of ", id)
		let locOfDoc = document.getElementById(`doctor-${id}`);
		// console.log('hover happened', locOfDoc)
		locOfDoc.classList.remove('selectionadd');
		
	}

	hover(id){
		// console.log(this.props.markerId)
		let locOfDoc = document.getElementById(`doctor-${id}`);
		console.log('hover happened', locOfDoc)
			locOfDoc.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
			locOfDoc.classList.add('selectionadd');
	}
	// componentDidUpdate(){
	// 	console.log(this.props.drData.data)//if after refresh this state is empty - we'll use sessionStorage
	// 	if (this.props.drData.data.length !== 0){
	// 		let doctors = this.props.drData.data.doctors;
	// 		console.log("from SearchResults", doctors);
	// 	}
	// }

	render(){
		var marker = this.props.marker;
		console.log("marker", marker)
		document.body.style.background = 'url("../images/background5.jpg") no-repeat center fixed'
		document.body.style.backgroundSize = 'cover'
		console.log(this.props.drData.data.doctors);//if after refresh this state is empty - we'll use sessionStorage
		if (this.props.drData.data.length !== 0){
			var doctors = this.props.drData.data.doctors;
			var myLocation = this.props.drData.data.mylocation;
			var locations = doctors.length;
			let locationsJSON = JSON.stringify(locations);
      		sessionStorage.setItem("locations", locationsJSON);

		}else{
			let doctorsInfo = sessionStorage.getItem('doctors');
			let myLocationInfo = sessionStorage.getItem('myLocation')
			let locationsInfo = sessionStorage.getItem('locations')
			doctors = JSON.parse(doctorsInfo);//somehow we loose state - so I use localstorage
			myLocation = JSON.parse(myLocationInfo);
			locations = JSON.parse(locationsInfo);
			console.log("from sessionStorage ", locations, typeof(locations))
		}

		
		if(marker){
			var selectedDoctors = doctors.filter((doc)=>{
				return doc.id === marker.id
			})
			var selectdoctors = selectedDoctors;
		}else{
			selectdoctors = doctors;
		}
		
		return(
				<div className="results-wrapper">
					<div className="row">
						<div className="col s7 big-box slide">
								{doctors.map((doctor, index)=>{
									return <DoctorResults key={index} profile={doctor} oneDoctorMarker = {this.mouseAction} />
								})}{/*we are closing .map and then JS expression here*/}
							</div>
							<div className="col s5 map slide2">
							{console.log(myLocation)}
								<DoctorMap hoverFunc={this.hover} mouseOut={this.onMouseOut} doctors={selectdoctors} myloc={myLocation} />
							</div>
					</div>
				</div>
		)
	}
}

	function mapStateToProps(state){
	 	// console.log(state);
	 	return{
	 		drData: state.searchResults,
	 		marker: state.selectMarker
	 	}
	}

	function mapDispatchToProps(dispatch){
		return bindActionCreators({
			mouseMarker: SelectMarker
		}, dispatch)
	}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);