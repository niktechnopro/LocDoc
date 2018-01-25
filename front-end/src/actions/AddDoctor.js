import axios from 'axios';

export default function(addDoctorData){

	var axiosPromise = axios({
		method: "POST",
		url: `${window.apiHost}/addDoctor`,
		data: addDoctorData
	})

	console.log("We tryna add sum docs ")

	return{
		type: "ADD_DOCTOR",
		payload: axiosPromise
	}

}