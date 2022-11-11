import axios, * as others from 'axios'

export default async function getTikTokData(url) {
    var response
    try {
        response = await axios(`http://localhost:5000/oauth`)
    } catch (error) {
        response = error
    }
    
    return response
}