import React, { useState, useEffect, useRef} from 'react'
import { useUrlTheme } from '../../context/Urls'
import './urllist.css'
export default function UrlList(){
  const {url_list_, url_} = useUrlTheme()
  const [url_list, setUrlList] = url_list_
  const [url, setUrl] = url_
  const send_icon_address = require('../../static/send.png')

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