export default ((info)=>{
	console.log('actions received with info', info)
	return{
		type: "HOVER_ON_NAME",
		payload: info
	}
});	
