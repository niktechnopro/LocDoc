import { combineReducers } from 'redux';
import SearchActionReducer from './SearchActionReducer';
import AuthReducer from './AuthReducer';
import AddDoctorReducer from './AddDoctorReducer';
import getDoctorReducer from './getDoctorReducer';
import SelectMarkerReducer from './SelectMarkerReducer';



const RootReducer = combineReducers({
	searchResults : SearchActionReducer, //when user is searching for doctor
	auth: AuthReducer,
	add: AddDoctorReducer,
	get: getDoctorReducer, //for login and reg
	selectMarker: SelectMarkerReducer //backfeed from doctor portion to select 1 marker
})

export default RootReducer;