var express = require('express');
var router = express.Router();
const geocode = require('../geocode/geocode.js');
const request_module = require('request');
const localDoctor = require('../localdoctor/localDoctorSelector');
// const doctor = require('../localdoctor/localDoctorInfo');
const API_KEY = require('../key/key');
// console.log(API_KEY);
var config = require('../config/config');
var mysql = require('mysql');

var randToken = require('rand-token');
var bcrypt = require('bcrypt-nodejs');
/* GET home page. */


var connection = mysql.createConnection(config.db)
connection.connect();



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/login', (req,res,next)=>{
	console.log(req.body);
	console.log("check for req.sexybody");

	const email = req.body.email;
	const password = req.body.password;


	const checkLoginQuery = `SELECT * FROM users
	WHERE users.email = ?`;

	connection.query(checkLoginQuery, [email], (error, results)=>{
		if (error){
			console.log(error)
			// throw error;
		}
		if (results.length === 0){
			res.json({
				msg: "badUsrMofo"
			})
		}else{
			const checkHash = bcrypt.compareSync(password, results[0].password)
			

			if(checkHash){
				const newToken = randToken.uid(100);
				const updateToken = `UPDATE users SET token = ?
									WHERE email = ?`;

				connection.query(updateToken, [newToken, email],(error)=>{
					if (error){
						throw error;
					}else{
						res.json({
							msg: "successss",
							street: results[0].street_address,
							token: newToken,
							name: results[0].name, 
							email: results[0].email,
							phone: results[0].phone,
							city: results[0].city,
							state: results[0].state,
							zipcode: results[0].zip_code,
							insurance: results[0].insurance,
							doctor: results[0].doctor,
							drID: results[0].drID
						})
					}
				})

		
			}else{
				res.json({
					msg: "wrongPassword"
				})
			}
		}
	})


});

router.post('/register', function(req,res,next){
	const userData = req.body;
	let name = userData.name;
	let email = userData.email;
	let address = userData.street;
	let password = userData.password;
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
		connection.query(insertQuery,[name, email, hash, address, city, state, zipcode, phone, insurance, token],(error,results)=>{
	 			if(error){
	 				throw error;
	 			}else{
	 				res.json({
	 					msg: 'success',
	 					token: token,
	 					name: name,
	 					email: email,
	 					password: password,
	 					city: city,
	 					state: state,
	 					zipcode: zipcode,
	 					phone: insurance,
	 					street: address,
	 					insurance: insurance
	 					
	 				})
	 			}
	 		})
		}
	})
});




//search based on query and location
router.post('/searchQuery',function(req, res, next){
	console.log('someone showed up here')
	// new query string:
	let baseURL = `https://api.betterdoctor.com/2016-03-01/doctors?query=k&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${API_KEY}`
})


//search based on insurance, location and specialty
router.post('/search', function(req, res, next){
	let searchData = req.body;
	// console.log('data from search form in Object', searchData);
	
	let location = searchData.location;
	let specialty = searchData.specialtyUid;
	let insurance = searchData.insuranceUid;
	
	let skip = searchData.skip || 0; //in api skip if
  	let limit = searchData.limit || 20; //produce || 'x' doctors by default - how many doctors
    geocode.geocodeAddress(location).then((result)=>{ //after extracting geolocationdata 
	    var lat = result.latitude;//we'll run search on doctor based on insurance and specialty		
	    var lng = result.longitute;
	    var geodata = {
	    	lat: lat,
	    	lng: lng
	    }
	    // console.log('results returned from geocode', lat, lng, specialty, insurance, API_KEY)
	    let baseURL = `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${specialty}&insurance_uid=${insurance}&location=${lat}%2C${lng}%2C10&user_location=${lat}%2C${lng}&sort=distance-asc&skip=${skip}&limit=${limit}&user_key=${API_KEY}`;
	    // var baseURL = `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${specialty}&insurance_uid=${insurance}&location=${lat}%2C${lng}%2C100&skip=0&limit=2&user_key=b277ca758b6d6b1634f652b3010348e1`;
        request_module ({url:baseURL, json: true}, (error, result, drData) => {
			// console.log('what was received from doctors api, ',drData.data);
        	if(error){
        		console.log(error)
        	}else{
        		//the following accounts for the incorrect search results
        		if (drData.data !== undefined && drData.data.length !== 0){
        			//we are going to use localDoctorSelector to find local practices
        			let doctors = localDoctor.localDoctorSelector(drData.data)
					// console.log('line 51 in index.js', localDoctor.localDoctorSelector(drData.data))
					console.log("doctor: ", doctors);
					// building data to send back
	        		if (doctors.length > 0){
		        		res.json({
		        			msg: "success",
		        			doctors: doctors,
		        			mylocation: geodata
		        			})
		        		}else{
		        			console.log("no results for your search")
	        				res.json({msg: "badSearch"});
		        		}
	        		}else{
	        			console.log("no results for your search")
	        			res.json({msg: "badSearch"});
        		}		
        	}
		});
	});    
});



router.post('/getDoctor', function(req,res,next){
	console.log(req.body);
	let drID = req.body.drID;

	const checkID = `SELECT * FROM doctors WHERE drID = ?`;
						console.log("SS%^&*(#UEHOHFFWN");


	connection.query(checkID,[drID],(error,results)=>{

		if(error){
			throw error
		}else if(results.length === 0){
			res.json({
				msg: 'no match'
			})
		}else{

						res.json({
							msg: "ok",
							drName: results[0].drName,
							drPractice: results[0].drPractice,
							drPhone: results[0].drPhone,
							drAddress: results[0].drAddress,
							drCity: results[0].drCity,
							drState: results[0].drState,
							drZip: results[0].drZip,
							drID: results[0].drID,
							drPhoto: results[0].drPhoto

						})
					
		}
	})
})

router.post('/addDoctor', function(req, res, next) {
	console.log(req.body);
	let drName = (req.body.drName);
	let drID = (req.body.drID);
	let drPractice = req.body.drName;
    let drAddress = req.body.drAddress;
    let drPhone = req.body.drPhone;
    let drCity = req.body.drCity;
    let drState = req.body.drState;
    let drZip = req.body.drZip;
    let drPhoto = req.body.drPhoto;
    let drToken = req.body.drToken;


	

    const selectQuery = "SELECT * FROM users WHERE users.token = ?;";
connection.query(selectQuery, [drToken],(error,results)=>{
	if(results.length == 0){
		console.log("Error, please login and try again");
		res.json({
			msg: "again"
		})
	}else{
		const insertQuery = `UPDATE users 
							 SET doctor = ?,
							 drID = ? 
							 WHERE token = ?`;
		connection.query(insertQuery,[drName,drID,drToken], (error,results)=>{
			if(error){
				throw error
			}else{
				// res.json({
				// 	msg: "cool",
				// 	name: drName
				// })

			}

		})
		const anotherQuery = `INSERT INTO doctors
		(drName,drPractice,drPhone,drAddress,drCity,drState,drZip,drID,drPhoto)
		VALUES (?,?,?,?,?,?,?,?,?);`;

		connection.query(anotherQuery,[drName,drPractice,drPhone,drAddress,drCity,drState,drZip,drID,drPhoto],(error,results)=>{
			if(error){
				throw error
			}else{
				res.json({
					msg: 'cool',
					name: drName,
					drID: drID
				})
			}
		})

	}

})

});





module.exports = router;
