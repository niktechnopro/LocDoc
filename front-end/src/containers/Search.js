import React from 'react';
import Specialty from '../components/Specialty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchAction from '../actions/SearchAction';
import Insurance from '../components/Insurance';
import { Link } from 'react-router-dom';

 

class Search extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event){
    event.preventDefault()
    var fadeIn = document.getElementsByClassName('hidden')[0];
    fadeIn.classList.add('fadein');
    var location = event.target[0].value;
    var insurance = event.target[1].value;
    var specialty = event.target[2].value;
    var resultsNumber = event.target[3].value;
//now we have to extract uid from insurance.js and specialties.js
    fadeIn.classList.add('fadein');
    this.props.searchAction(location, insurance, specialty)
  }

  // to clear storage on load
  // componentWillMount(){
  //   sessionStorage.clear();
  // }  
  componentWillReceiveProps(nextProps){
      if (nextProps.drData.data !== undefined){
        if (nextProps.drData.data.msg === 'success'){
          this.props.history.push("/doctors")
        }
      // var msg = this.props.drData.data.msg
      // // console.log("our message", msg)
    }  
  }

  componentDidUpdate(){ 
    var fadeIn = document.getElementsByClassName('hidden')[0];
    let data = this.props.drData.data;
    fadeIn.classList.remove('fadein');
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
  }

  render() {

    document.body.style.background = 'url("../images/clipboard.jpg") no-repeat center center fixed'
    document.body.style.backgroundSize = 'cover'
    console.log("drData", this.props.drData.data)
    if (this.props.drData.data.length !== 0){
      var msg = this.props.drData.data.msg
      // console.log("our message", msg)
    }  
    return (
       <div className="container center">
      <div className="row">
      <div className="search-wrapper z-depth-5">
      
     <div className='center'>
        <h2 className="message center slide">
        
         Let's find you a doctor!
          </h2>
        
          <form className="search-box z-depth-5 center slide2" onSubmit={this.handleSubmit}>
            <div className="col s12 center">
            <h5>Your Location</h5>
              
             <input type="text" required id="location-search" className="center search-input col s3" placeholder="" />
              
           </div>
            <div className="col s12">
           <h5>Insurance</h5>
              <Insurance onInsuranceChange={this.onInsuranceChange} />
            </div>
            <div className="col s12">
            <h5>Specialty</h5>
              <Specialty id="test" onSpecialtyChange={this.onSpecialtyChange} />
            </div>
              
            <button type="submit" className="btn center wave-effect white-text">Search</button>
            
         </form>
           {(this.props.drData.data.msg === undefined) && <h3 className="message">Define Your Search Above</h3>}          {(this.props.drData.data.msg === undefined) && <h3></h3>}
            {(msg === "badSearch") && <img src="/images/no-result.png"  />}
           <h3 className="hidden slide">Searching...Please Wait</h3>      
          
       </div>
        </div>
        </div>
        </div>
    );
  }
}
  function mapStateToProps(state){ 
      // console.log(state.searchResults)//state has all keys from Rootreducer object
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
// {(msg === "success") && <Link to="/doctors"><img src="/images/results.png" /></Link>}
//           {(this.props.drData.data.msg === undefined) && <h3 className="message">Define Your Search Above</h3>}
//           {(msg === "badSearch") && 
//           <img src="/images/no-result.png"  />}
//           {(msg === "success") && <div><Link to="/doctors"><img src="/images/results.png" /></Link></div>}
//           <h3 className="hidden slide">Searching...Please Wait</h3>      