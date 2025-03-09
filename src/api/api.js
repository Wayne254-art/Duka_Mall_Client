import axios from 'axios'
const local = 'http://localhost:5000'
// const local = 'https://dukamall-backend.onrender.com'
// const production = ''
const api = axios.create({
    baseURL: `${local}/api`,
    withCredentials : true
})
export default api