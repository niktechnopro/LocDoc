export default function (state = null, action){
	if (action.type === "HOVER_ON_NAME"){
		return action.payload;
	}else if (action.type === "HOVER_OFF_NAME"){
		return null; //resets marker to 0
	}else{
		return state; //returns initial state
	}
}