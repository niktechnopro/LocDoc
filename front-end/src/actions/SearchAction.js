import Specialty from '../components/Specialties';
import Insurance from '../components/Insurances';
import axios from 'axios';

export default ((location, insurance, specialty, resultsNumber)=>{
	console.log("search action fired up with data: ");
  //1st extracting insuranceUid
  const insuranceUid = (insurance) => {
      for (let i=0; i< Insurance.length; i++){ 
        if(insurance === Insurance[i].Network){
          console.log(insurance)
          return Insurance[i].uid
      }
    }
  }
  // 2nd extracting specialty Uid
  const specialtyUid = (specialty) => {
    for (let i=0; i< Specialty.length; i++){
      if(specialty === Specialty[i].name){
        return Specialty[i].uid;
      }
    }
  }
  const insUid = insuranceUid(insurance);
  const specUid = specialtyUid(specialty)
  console.log("data to send ", location, insUid, specUid);
  let formData = {
    location: location,
    insuranceUid: insUid,
    specialtyUid: specUid,
    
  }

  var axiosPromise = axios({
    method: "POST",
    url : `${window.apiHost}/search`,//look into index.html
    data: formData
  })

  console.log('data sent to: ', `${window.apiHost}/search`)
  return{
    type: "SEARCH_ACTION",
    payload: axiosPromise,
  }
})