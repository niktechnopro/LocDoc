import React from "react"
import { compose, withProps } from "recompose"; //react utility belt for function components and higher-order compoenets.
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const google = window.google; //this takes care of an error that google is not defined
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const color = {
      'blue' : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      'red' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    };
const drop = {
    'drop' : google.maps.Animation.DROP,
    'bounce' : google.maps.Animation.BOUNCE
}
var mar;
var mar2;

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    // googleMapURL:  'https://maps.googleapis.com/maps/api/js?key=AIzaSyBehz0GVd8SbdQVMswQlcV-cx0yjExniA0&v=3.exp&libraries=geometry,drawing,place',
    loadingElement: <div style={{ height: `100%`}} />,
    containerElement: <div style={{ height: `90vh`}} />,
    mapElement: <div style={{ height: `100%`, top: '4em' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.myloc.lat, lng: props.myloc.lng}}
    options={{streetViewControl: false}}

  > {console.log(props)}
    return
    <MarkerWithLabel 
    position={ props.myloc }
    labelAnchor={new google.maps.Point(30,48)}
    labelStyle={{backgroundColor: "blue", fontSize: "10px", color:"white", padding: "3px"}}
    defaultIcon = {{url:'https://cdn4.iconfinder.com/data/icons/32x32-free-design-icons/32/Home.png', width: '10px'}}
    animation = {google.maps.Animation.DROP}
    onMouseOver = {(e)=>{console.log({...props})}}
     >
     <div>You are Here</div>
     </MarkerWithLabel>
     {console.log(props.doctors)}
    {(props.doctors.length < 2) ? (mar = (color['red'])) : (mar = (color['blue']))}
    {(props.doctors.length < 2) ? (mar2 = (drop['bounce'])) : (mar2 = (drop['drop']))}
    {console.log(props.doctors)}
    {props.doctors.map((map, i)=>{
      return <Marker icon={{url: `${mar}`}}
      key={i} position={{ lat: map.lat, lng: map.lng }} 
      animation={mar2} 
      onMouseOver={(e)=>{props.onMarkerHover(map.visitAddress)}} 
      onMouseOut={(e)=>{props.onMouseOut(map.visitAddress)}}
      visible = {true}
      // label = {props.doctors[i].name}
      /> 
    })}
  </GoogleMap>
)

class DoctorMap extends React.PureComponent {

  handleMarkerHover = (id) => {
    this.props.hoverFunc(id);
    // console.log("over marker with Id: ", id);
  }

  handleMouseOver = (id) => {
    this.props.mouseOut(id);
  }

  render() {
    const doctors = this.props.doctors;
    const myloc = this.props.myloc;
      return(
          <MyMapComponent 
          onMarkerHover={this.handleMarkerHover}
          onMouseOut={this.handleMouseOver} 
          doctors = {doctors} 
          myloc = {myloc} 
          />

       )
  }
}

export default DoctorMap;