console.log('local doctor loading');
//this module will look through drData 
//and select local office(if there are multiple offices or states involved)
//for every doctor
//the output from here is array with doctors with arranged information
const localDoctorSelector = (drdata)=>{
	//let's make an array with doctors
	let radius = 5; //initial search of 5 miles;
	let doctorArray = [];
	// console.log("localDoctorSelector has been invoked ", drdata);
	// we are going to make a big json with all possible info that we need for each doctor
	let locations = drdata.map((doctor, index)=>{
	// console.log("line 8 for one doctor", doctor.practices);
	// console.log("line 9", doctor.profile)
	let id = index + 1;
	if (doctor.profile.title){
		var fullName = doctor.profile.first_name + " " + doctor.profile.last_name + " " + doctor.profile.title
	}else{
		fullName = doctor.profile.first_name + " " + doctor.profile.last_name
	}
	// doctors may have multiple locations - we need to check if they marked as local
	let locations = doctor.practices.filter((location)=>{
		return (location.within_search_area === true);
	})
		locations.map((location)=>{
			console.log('line 27', location.visit_address.street, "with name: ", location.name)
		})
		//some doctors have multiple locations
		console.log('doctor with id: ', id, "has: ", locations.length, "local locations");
		let location = locations[0];
		if (location !== undefined && location.distance < radius){
			if (location.visit_address.street2 !== undefined){
				var address = location.visit_address.street + ' ' + location.visit_address.street2;
			}else{
				address = location.visit_address.street;
			}
			var docprofile = {
			id : id,
			fullName : fullName,
			visitAddress : address,
			city : location.visit_address.city,
			state : location.visit_address.state_long,
			zip : location.visit_address.zip,
			phoneArray : location.phones,
			lat : location.lat,
			lng : location.lon,
			
			photo : doctor.profile.image_url,
			uid: location.uid,
			bio: doctor.profile.bio,
			specialty: doctor.profile.specialty,
			name: location.name,
			distance: location.distance,
			website: location.website

				}
			doctorArray.push(docprofile);
		}else{
			return
		}
		// console.log(doctorArray[index].fullName, doctorArray[index].visitAddress)
	});
	// console.log('from local doctor search', doctorArray)
	return (doctorArray);

}

module.exports.localDoctorSelector = localDoctorSelector;