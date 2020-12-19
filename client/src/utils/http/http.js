import Axios from "axios"

export default Axios.create({
    baseURL: window.location.origin.replace(":3000",":4000")
});