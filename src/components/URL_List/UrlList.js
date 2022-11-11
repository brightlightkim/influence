import React, { useState, useEffect, useRef} from 'react'
import { useUrlTheme } from '../../context/Urls'
import './urllist.css'
export default function UrlList(){
  const {url, handleChange, handleClick} = useUrlTheme()
  const send_icon_address = require('../../static/send.png')

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