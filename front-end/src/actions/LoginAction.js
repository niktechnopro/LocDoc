import axios from 'axios';

export default function(formData){

	var axiosPromise = axios({
		method: "POST",
		url: `${window.apiHost}/login`,
		data: formData
	})

	console.log("We tryna login over hurr")

	return{
		type: "AUTH_ACTION",
		payload: axiosPromise
	}

}