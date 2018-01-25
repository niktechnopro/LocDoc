## Overview of Project:
LocDoc is a powerful tool that enable a user to find doctors based on location, insurance, and specialty preferenes.  
This was built using Node.Js and React.

## The Team:
* **[Nikolas Bogucharsky](https://github.com/niktechnopro)**: 
	* **Primary team role**: React 
  	* **Contributions**:  Timer, event listeners, jQuery effects, audio notification, jokes API 
  	

* **[Taylor Whitlatch](https://github.com/TaylorWhitlatch)**: 
	* **Primary team role**: Front-End, API
  	* **Contributions**:  HTML, CSS, AutoSuggest 
  	

* **[Saif Mahmud](https://github.com/saiftg)**:
	* **Primary team role**: Logic contributor
  	* **Contributions**:  Debugging, refactoring
  	



## Technologies, Frameworks, and Programming Languages used:
* **Markup Languages and Style Sheets**:
    * HTML (HTML5)
    * CSS/SASS

* **Frameworks**:
    * React
    * Express
    
    
* **Programming Languages**:
	* JavaScript
    
* **Libraries**:
    * jQuery
    * Redux
 
    



## MVP (Minimum Viable Product):
* Login to profile
* Save specific doctors to profile
* Auto suggestion for insurance and specialty fields
* Search results based on insurance, specialty and location
* Interactive map showing doctor locations
* Obtain profiles for individual doctors


## Code Snippets:

````Data Manipulation
const profile = this.props.profile;
		var phoneNumber = JSON.stringify(profile.phoneArray[0].number);
             phoneNumber = phoneNumber.replace(/\D+/g, '')
             .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        var distance = (profile.distance.toFixed(2))
		const marker = {
			lat : profile.lat,
			lng : profile.lng,
			id: profile.id
		}
````Registration
  router.post('/register', function(req,res,next){
	const userData = req.body;
	let name = userData.name;
	let email = userData.email;
	let password = userData.password;
	let street = userData.street
	let city = userData.city;
	let state = userData.state;
	let zipcode = userData.zipcode;
	let phone = userData.phoneNumber;
	let insurance = userData.insuranceType;
	const selectQuery = "SELECT * FROM users WHERE email = ?;";
	connection.query(selectQuery,[email],(error,results)=>{
		if(results.length != 0){
			console.log("EMAIL REG ALREADY");
			res.json({
					msg: "alreadyin"
				})
			}else{
				const hash = bcrypt.hashSync(password);
				const token = randToken.uid(60);
				const insertQuery = `INSERT INTO users 
				(name, email, password, street_address, city, state, zip_code, phone, insurance, token) 
				VALUES (?,?,?,?,?,?,?,?,?,?);`;
		connection.query(insertQuery,[name, email, hash, street, city, state, zipcode, phone, insurance, token],(error,results)=>{
	 			if(error){
	 				throw error;
	 			}else{
	 				res.json({
	 					token: token,
	 					name: userData.name,
	 					msg: 'success'
	 				})
	 			}
	 		})
		}
	})
});
```

````Backend doctor selector
  const localDoctorSelector = (drdata)=>{
	
	let radius = 5;
	let doctorArray = [];
	let locations = drdata.map((doctor, index)=>{
	let id = index + 1;
	if (doctor.profile.title){
		var fullName = doctor.profile.first_name + " " + doctor.profile.last_name + " " + doctor.profile.title
	}else{
		fullName = doctor.profile.first_name + " " + doctor.profile.last_name
	}
	
	let locations = doctor.practices.filter((location)=>{
		return (location.within_search_area === true);
	})
		locations.map((location)=>{
			console.log('line 27', location.visit_address.street, "with name: ", location.name)
		})
		//some doctors have multiple locations
		console.log('doctor with id: ', id, "has: ", locations.length, "local locations");
		let location = locations[0];
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
		npi: doctor.npi,
		photo : doctor.profile.image_url,
		uid: location.uid,
		bio: doctor.profile.bio,
		specialty: doctor.profile.specialty,
		name: location.name,
		distance: location.distance,
		website: location.website

			}
		doctorArray.push(docprofile);
		
	});
	
	return (doctorArray);

}

## Project Screenshots:
VIDEO

## 3 Contributions We’d Like to See:
1. Multiple "favorite doctors"
2. Search based on ailments
3. Social media login

