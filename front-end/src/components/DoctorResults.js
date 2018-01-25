import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

 
class DoctorResults extends Component{


	mouseHandler(info,offOrOn){
		console.log(info, offOrOn)
		if(offOrOn == "on"){
			this.props.oneDoctorMarker(info)
		}else{
			this.props.oneDoctorMarker('')
		}
	}

	render(){
		// console.log(this.props.profile);
		const profile = this.props.profile;
		// console.log(profile)
		var phoneNumber = JSON.stringify(profile.phoneArray[0].number);
             phoneNumber = phoneNumber.replace(/\D+/g, '')
             .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        var distance = (profile.distance.toFixed(2))
		const marker = {
			lat : profile.lat,
			lng : profile.lng,
			id: profile.id
		}

		// console.log("this many phones in practice", phones)
		// console.log(profile.phoneArray)
			return(
			<div id={`doctor-${profile.visitAddress}`}>    
            <div className="row doc">
                <div className="doctor-results-box col s4 m12">
                    <div className="col s2 hide-on-med-and-down "><img src={profile.photo} className="photo" alt="doctor's pic" /></div>
                    <h5 className ="name-results"><Link onMouseOut={()=>{this.mouseHandler(marker,'out')}} onMouseOver={()=>{this.mouseHandler(marker,'on')}} to={`/doctor/${profile.id}`}>{profile.fullName}</Link></h5>
                    <div className="practice-results">{profile.name}</div>
                    <div className="practice-street-results">{profile.visitAddress}</div>
                    <div className="practice-city-state-zip-results">{profile.city}, {profile.state}, {profile.zip}</div>
                    
                   <div className="phone-results">Phone number: {phoneNumber}</div>
                    
               <div className="distance-results">From your location: {distance} Miles</div>
                
            </div>

            </div>
            <hr /> 
            </div>         	
		)





	}
}			



export default DoctorResults;