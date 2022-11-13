import React, {useContext, useState, useEffect} from 'react'
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
    const [changed, setChanged] = useState(false)

    const handleChange = (event) => {
        //Update the url as it changes
        setUrl(event.target.value)
    }

    const handleMoneyInput = (event) =>{
        setMoney(event.target.value)
    }

    const handleClick = async (event) => {
        // This makes sure that both elements have to be filled.
        if (url !== '' && money !== ''){
            const user_id = 'sun'
            // Get the tiktok Data
            fetch(`http://127.0.0.1:5000/?url=${url}&user_id=${user_id}&money=${money}`)
            .then(response => response.json())
            .then(json => {
                var items = []
                json.map((item, index)=>{
                    items.push(JSON.parse(item.video_json))
                })
                setUrlList(items)
                console.log(url_list)
            })
            
            setUrl('')
            setMoney('')
            setChanged(!changed)
            event.preventDefault() // Prevent the HTML form behavior
            
        }
    }

    useEffect(()=>{
        //views
        const views = calculateData(url_list, 'views')
        setViews(views)
        // likes
        const likes = calculateData(url_list, 'likes')
        setLikes(likes)
        // comments
        const comments = calculateData(url_list, 'comments')
        setComments(comments)
        // shares
        const shares = calculateData(url_list, 'shares')
        setShares(shares)
        console.log("Use Effect")
    }, url_list)

    return (
        <UrlContext.Provider value={{
            url, url_list, money, views, likes, shares, comments, setUrl, setUrlList, setMoney,
            handleMoneyInput, handleChange, handleClick, setViews, setLikes, setComments, setShares
            }}>
            {children}
        </UrlContext.Provider>
    )
}
