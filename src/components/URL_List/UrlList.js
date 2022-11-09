import React, { useState, useEffect, useRef} from 'react'
import './urllist.css'
export default function UrlList(){
    const {url_list, setUrlList} = useState(['', '', ''])
    const {url, setUrl} = useState('')
    const send_icon_address = require('../../static/send.png')

    const handleChange = (event) => {
        //Update the value of message each time it changes.
        setUrl(event.target.value)
    }
    
    const handleClick = (event) => {
        if (url !== ''){
            // Display User Input First
            setUrlList(oldUrlList => [...url_list, url])
          
          // Then fetch the nlp backend response and add it to the chat items
        //   fetch(setting.url + `/?text=${message}`)
        //   .then(response => response.json())
        //   .then(json => {
        //     // Update the chat items with the given response
        //     setChatItems(oldChatItems => [...chatItems, message, json.response])
        //     // Update the json object for updating
        //     setNlpObject(json)
        //     console.log(nlpObject)
        //   })
        //   .catch(error => setChatItems(oldChatItems => [...chatItems, message, "Failed to get the response. Please try again."]))
          event.preventDefault() // Prevent the HTML form behavior
        }
      }

    return (
        <div className='url_container'>
            <form className='userinput' onSubmit={handleClick}>
                <input
                    type="url"
                    id="url"
                    name="url"
                    className="form-control"
                    placeholder="Type the Url!"
                    onChange={handleChange}
                    value={url}
                    required
                    autoFocus
                />
                <button className='submit' onClick={handleClick}>
                    <img className='send_icon' src={send_icon_address} alt='send_icon'/>
                </button>
          </form>
        </div>
    )

}