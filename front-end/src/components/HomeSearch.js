import React from 'react';
import Specialty from './Specialty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchAction from '../actions/SearchAction';
import Insurance from './Insurance';
import { Link } from 'react-router-dom';



class Search extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
 handleSubmit(event){
      event.preventDefault()
    var location = event.target[0].value;
    var insurance = event.target[1].value;
    var specialty = event.target[2].value;
    var resultsNumber = event.target[3].value;
//now we have to extract uid from insurance.js and specialties.js
    this.props.searchAction(location, insurance, specialty);
  }

 // to clear storage on load
  // componentWillMount(){
  //   sessionStorage.clear();
  // }  


 componentDidUpdate(){
    let data = this.props.drData.data;

   // console.log("componentDidUpdate fired up", data)
    if (data.msg === 'success'){
      let doctorJSON = JSON.stringify(data.doctors);
      let myLocJSON = JSON.stringify(data.mylocation);
      sessionStorage.setItem("doctors", doctorJSON);//storing profile for the length of the session
      sessionStorage.setItem("myLocation", myLocJSON);//storing my location
      // console.log('message success')
    }else{
      console.log("Search combination of Insurance and Doctor Specialty is incorrect");
    }

       this.props.drData.data.msg = undefined

   
 }

 render() {

   
   console.log("drData", this.props.drData.data)
    if (this.props.drData.data.length !== 0){
      var msg = this.props.drData.data.msg
      // console.log("our message", msg)
    }  
   return (
      <div className="container center search-container col s12 slide">
        
        <h3 className="message center slide">
          Let's find you a doctor!
          </h3>
          <form className="search-box z-depth-5 row center" onSubmit={this.handleSubmit}>
            <div className="col s12 inputs center">Your Location
              
             <input type="text" required id="location-search" className="center search-input col s3" placeholder="" />
              
           </div>
            <div className="col s12">Insurance
              <Insurance onInsuranceChange={this.onInsuranceChange} />
            </div>
            <div className="col s12">Specialty
              <Specialty id="test" onSpecialtyChange={this.onSpecialtyChange} />
            </div>
              
            <button type="submit" className="btn center wave-effect white-text">Search</button>
            
         </form>
          {(this.props.drData.data.msg === undefined) && <h3></h3>}
          {(msg === "badSearch") &&
          <img src="/images/no-result.png"  />}
          {(msg === "success") && <div><Link to="/doctors"><img src="/images/results.png" /></Link></div>}
          
      </div>
    );
  }
}

 function mapStateToProps(state){
      console.log(state.searchResults)//state has all keys from Rootreducer object
      return {
        drData : state.searchResults, //this comes from the rootreducer
      }
    }
  
 // this is what binds this component to action
  function mapDispatchToProps(dispatch){ //makes my ajax request
    // console.log('mapDispatchToProps method inside CountriesList gets this', dispatch);
    return bindActionCreators({
      searchAction: SearchAction
    }, dispatch)
  }

export default connect(mapStateToProps,mapDispatchToProps)(Search);

