import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './containers/NavBar';
import Search from './containers/Search';
import SearchResults from './containers/SearchResults';
import DoctorProfile from './components/DoctorProfile';
import SavedDoctor from './containers/SavedDoctor';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import Profile from './containers/Profile';
import Logout from './containers/Logout';



import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Search from './containers/Search'

class App extends Component {
  render() {
    return (
      <Router>
      
        <div className="App">
          <NavBar />

          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/doctors" component={SearchResults} />
          <Route exact path="/doctor/:id" component={DoctorProfile} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/' component={Logout}/>
          <Route exact path='/getDoctor/:drID' component={SavedDoctor}/>


        </div>

      </Router>
    );
  }
}

export default App;