

export default function(state=[], action){
	switch(action.type){
		case "AUTH_ACTION":
			return action.payload.data;
			break;
		case "LOGOUT":
			return [];
			break;
		default: 
			return state;
	}
	console.log(action);
	console.log("Larry David presents 'The Reducers!'");
}