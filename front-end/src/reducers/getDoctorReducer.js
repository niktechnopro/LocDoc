export default function(state=[], action){
	switch(action.type){
		case "GET_DOCTOR":
			return action.payload.data;
			break;
		
		default: 
			return state;
	}
	console.log(action);
	console.log("Larry David presents 'The Reducers!'");
}