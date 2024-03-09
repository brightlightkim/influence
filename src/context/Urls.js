import React, {useContext, useState} from 'react'
import calculateData from '../components/mainpage/calculate_helper'

const UrlContext = React.createContext()

export function useUrlTheme() {
    return useContext(UrlContext)
}

export function UrlThemeProvider({children}){
    const [url_list, setUrlList] = useState([])
    const [url, setUrl] = useState('')
    const [money, setMoney] = useState('')
    const [views, setViews] = useState(0)
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)
    const [shares, setShares] = useState(0)

    const handleChange = (event) => {
        //Update the url as it changes
        setUrl(event.target.value)
    }

    const handleMoneyInput = (event) =>{
        setMoney(event.target.value)
    }

    const updateData = (items) =>{
        const views = calculateData(items, 'views')
        setViews(views)
        // likes
        const likes = calculateData(items, 'likes')
        setLikes(likes)
        // comments
        const comments = calculateData(items, 'comments')
        setComments(comments)
        // shares
        const shares = calculateData(items, 'shares')
        setShares(shares)
    }

    const handleClick = async (event) => {
        event.preventDefault() // Prevent the HTML form behavior
        // This makes sure that both elements have to be filled.
        if (url !== '' && money !== ''){
            const user_id = 'sun'
            // Get the tiktok Data
            fetch(`http://127.0.0.1:5001/?url=${url}&user_id=${user_id}&money=${money}`)
            .then(response => response.json())
            .then(json => {
                var items = []
                json.map((item, index)=>(
                    items.push(JSON.parse(item.video_json))
                ))
                setUrlList(items)
                updateData(items)
            })
            .catch(error => console.log(error))
            
            setUrl('')
            setMoney('')
        }
    }

    return (
        <UrlContext.Provider value={{
            url, url_list, money, views, likes, shares, comments, setUrl, setUrlList, setMoney,
            handleMoneyInput, handleChange, handleClick, setViews, setLikes, setComments, setShares
            }}>
            {children}
        </UrlContext.Provider>
    )
}
