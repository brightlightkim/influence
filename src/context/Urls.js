import React, {useContext, useState} from 'react'

const UrlContext = React.createContext()

export function useUrlTheme() {
    return useContext(UrlContext)
}

export function UrlThemeProvider({children}){
    const [url_list, setUrlList] = useState([])
    const [url, setUrl] = useState('')

    const handleChange = (event) => {
        //Update the url as it changes
        setUrl(event.target.value)
    }

    const handleClick = async (event) => {
        if (url !== ''){
            // Display User Input First
            setUrlList(oldUrlList => [...url_list, url])
            
            // Get the tiktok Data
            fetch(`http://127.0.0.1:5000/?url=${url}`)
            .then(response => response.json())
            .then(json => {
              setUrlList(oldUrlList => [...url_list, json])
            })
            .then(console.log(url_list))
          
            event.preventDefault() // Prevent the HTML form behavior
        }
    }

    return (
        <UrlContext.Provider value={{
            url, url_list, setUrl, setUrlList,
            handleChange, handleClick
            }}>
            {children}
        </UrlContext.Provider>
    )
}
