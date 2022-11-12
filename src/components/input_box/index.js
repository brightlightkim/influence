import React from 'react'
import { useUrlTheme } from '../../context/Urls'
import './input_box.css'
export default function InputBox(){
  const {url, handleChange, money, handleMoneyInput, handleClick} = useUrlTheme()

  return (
    <div className='input_container'>
      <form className='userinput' onSubmit={handleClick}>
        <input
          type="url"
          id="url"
          name="url"
          className="input_box"
          placeholder="Type the Url!"
          onChange={handleChange}
          value={url}
          required
          autoFocus
        />
        <input
          type='money'
          id='money'
          name='url'
          className='input_box'
          placeholder='Type Money spent for this video'
          onChange={handleMoneyInput}
          value={money}
          required
          autoFocus
        />
      </form>
      <button className='submit' onClick={handleClick}>
        SUBMIT
      </button>
    </div>
  )

}