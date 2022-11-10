import axios, * as others from 'axios'

export default async function getTikTokAccessToken() {
    var response
    try {
        response = await axios(`http://localhost:5000/oauth`)
    } catch (error) {
        response = error
    }
    
    return response
}