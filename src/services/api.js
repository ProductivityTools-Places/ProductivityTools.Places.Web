import axios from 'axios'
import { config } from '../config.js'
import { tokenExpired } from '../Session/firebase'

async function getDate() {
    const response = await axios.get(`${config.PATH_BASE}/Date`)
    return response.data;
}

async function invokeCall(call) {
    if (tokenExpired())
    {
        console.log("seems that token is expired. Not performing a call");
       // return;
    }
    let token = localStorage.getItem('token')
    console.log("token from localstorage", token)
    const header = { headers: { Authorization: `Bearer ${token}` } }
    try {
        const response = await call(header);
        //   debugger;
        return response;
    } catch (error) {
        console.log("Call endpoint");
        console.log(error);
        throw error;
    }
}

async function getPlace(id) {
    const response = await axios.get(`${config.PATH_BASE}/Place?id=${id}`);
    return response.data;
}

async function getPlaceList() {
    console.log("getPlaceList");
    let call = async (header) => {
        const response = await axios.get(`${config.PATH_BASE}/PlaceList`, header);
        return response.data;
    }
    return invokeCall(call);
}

async function newPlace(data) {
    const response = await axios.post(`${config.PATH_BASE}/NewPlace`, data);
    let r = response.data;
    return r;
}

async function updatePlace(place) {
    const response = await axios.post(`${config.PATH_BASE}/UpdatePlace`, place);
    let r = response.data;
    return r;
}


// async function newVisit(){
//     let data={Comment:"pawel ma kota"}
//     const response=await axios.post(`${config.PATH_BASE}/NewVisit`,data);
//     let r=response.data;
//     return r;
// }

async function uploadPhoto(photo, placeId) {
    const formData = new FormData();
    let photoName = placeId + "-" + photo.name;
    // Update the formData object
    formData.append(
        "file",
        photo,
        photoName
    );


    // Details of the uploaded file
    console.log(photo);

    // Request made to the backend api
    // Send formData object
    const response = await axios.post(`${config.PATH_BASE}/uploads`, formData);
    return response.data;
}

async function getPhotosBaseUrl() {
    const response = await axios.get(`${config.PATH_BASE}/get-photos-base-url`);
    return response.data;
}

async function migrateImages() {
    console.log("migrateImages");
    let call = async (header) => {
        const response = await axios.post(`${config.PATH_BASE}/migrate-images`, {}, header);
        return response.data;
    }
    return invokeCall(call);
}

async function deletePhoto(photo) {
    let call = async (header) => {
        const filename = typeof photo === 'string' ? photo.split('/').pop() : photo;
        console.log("deletePhoto", filename);
        const response = await axios.delete(`${config.PATH_BASE}/photos/${filename}`, header);
        return response.data;
    }
    return invokeCall(call);
}

async function deletePlace(id) {
    const response = await axios.post(`${config.PATH_BASE}/DeletePlace`, { id: id });
    return response.data;
}

const service = {
    getDate,
    getPlace,
    getPlaceList,
    newPlace,
    updatePlace,
    uploadPhoto,
    migrateImages,
    getPhotosBaseUrl,
    deletePhoto,
    deletePlace
}

export default service