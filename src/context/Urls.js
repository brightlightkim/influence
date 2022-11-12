import React, {useContext, useState} from 'react'

const UrlContext = React.createContext()

export function useUrlTheme() {
    return useContext(UrlContext)
}

export function UrlThemeProvider({children}){
    const [url_list, setUrlList] = useState([])
    const [url, setUrl] = useState('')
    const [money, setMoney] = useState('')

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
            fetch(`http://127.0.0.1:5000/?url=${url}&user_id=${user_id}`)
            .then(response => response.json())
            .then(json => {
                // Set the money value
                json.money = money
                setUrlList(oldUrlList => [...url_list, json])
                console.log(url_list)
            })
            
            // setUrl('')
            event.preventDefault() // Prevent the HTML form behavior
        }
    }

    return (
        <UrlContext.Provider value={{
            url, url_list, money, setUrl, setUrlList, setMoney,
            handleMoneyInput, handleChange, handleClick
            }}>
            {children}
        </UrlContext.Provider>
    )
}
