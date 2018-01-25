import React, { Component } from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';
import Search from '../components/HomeSearch';
// import Search from '../containers/Search';
class Home extends Component{

	render(){
		document.body.style.background = 'url("../images/background7.jpg") no-repeat center center fixed'
		document.body.style.backgroundSize = 'cover'
		return(
			
			<div className='row'>
			<div className='col m12 offset-m4 title-head justify'>

			<div>Welcome to LocDoc</div>
			</div>
			<div className="col m5 offset-m6 search-box-home z-depth-5">
			<Search />
			</div>

				
			</div>
					

			)

	}
}

export default Home;