import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject) // generates id for you
    return request.then(response => response.data)
}

const deleteNum = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = request.then(response => response.data) // does not return anything
    console.log(response)
    return response
}

const replace = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, create, deleteNum, replace}