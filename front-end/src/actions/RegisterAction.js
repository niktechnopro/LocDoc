import axios from 'axios';

export default function(formData){
	console.log(formData);

	var axiosPromise = axios({
		method: "POST",
		url: `${window.apiHost}/register`,
		data: formData
	})

	console.log("We tryna register over hurr")

	return{
		type: "AUTH_ACTION",
		payload: axiosPromise
	}

}