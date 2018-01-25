import axios from 'axios';

export default function(formData){
	console.log(formData);
	var url = `http://localhost:8282/getDoctor`
	console.log(url);

	var axiosPromise = axios({
		method: "POST",
		url: url,
		data: formData
	})

	console.log("Getting doc info")

	return{
		type: "GET_DOCTOR",
		payload: axiosPromise
	}

}