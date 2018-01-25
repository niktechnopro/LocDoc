export default function (state = {data:""}, action){
	// console.log("reducer in action: ", state.data, action) //object that has type and payload(has data)
	if (action.type === "SEARCH_ACTION"){
		return action.payload;
	}else{
		return state; //returns initial state
	}
}

//all this crap is passed to root reducer