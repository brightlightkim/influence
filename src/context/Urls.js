import React, {useContext, useState} from 'react'

const UrlContext = React.createContext()

export function useUrlTheme() {
    return useContext(UrlContext)
}

export function UrlThemeProvider({children}){
    const [url_list, setUrlList] = useState([])
    const [url, setUrl] = useState('')

    return (
        <UrlContext.Provider value={{
            url_list_: [url_list, setUrlList],
            url_: [url, setUrl]
            }}>
            {children}
        </UrlContext.Provider>
    )
}
