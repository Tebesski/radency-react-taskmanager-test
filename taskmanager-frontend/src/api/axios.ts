import axios from "axios"
import API_URL from "../../env/env.prod.js"

const client = axios.create({
   baseURL: import.meta.env.VITE_API_URL || API_URL,
})

export default client
