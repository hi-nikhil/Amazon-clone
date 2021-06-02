import axios from "axios";
const instance=axios.create({
    //The API(cloud function) URL
    baseURL: 'http://localhost:5001/clone-eec94/us-central1/api',  //The API (cloud function) URL
});

export default instance;