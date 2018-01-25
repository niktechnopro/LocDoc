import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginAction from '../actions/LoginAction';
import AddDoctor from '../actions/AddDoctor';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


class NavBar extends Component{
	//  componentWillReceiveProps(props){
	// }
	render(){
		console.log(this.props.auth);
		console.log(this.props.add);
		if (this.props.auth !== undefined){
			var username = this.props.auth.name
		}
		return(

		<div className="navbar-fixed slide">

		    <nav>
		      <div className="nav-wrapper  deep-purple accent-4">

		        <Link to='/' ><img className="brand-logo left logo" src="/images/logo2.png" /></Link>
		        <ul className="right hide-on-med-and-down">
		          <li key={1} className=""><Link to="/profile">Welcome {username}!</Link></li>		          <li key={2}><Link to="/search">Search</Link></li>
		          <li key={3}><Link to="/register">Sign Up</Link> </li>
		          <li key={4}><Link to="/login">Login</Link> </li>
		          <li key={5}><Link to="/">Logout</Link> </li>
		        </ul>
		      </div>
		    </nav>
  		</div>

			)
	}
}

function mapStateToProps(state){
	// state = RootReducer
	return{
		auth: state.auth,
		
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		loginAction: LoginAction,
	},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
