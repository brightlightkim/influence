import React from 'react'
import { useUrlTheme } from '../../context/Urls'
import InputBox from '../input_box'
import './urllist.css'
export default function UrlList(){
  const {url, handleChange, money, handleMoneyInput, handleClick} = useUrlTheme()

  return (
    <div className='url_list_container'>
      <InputBox/>
    </div>
  )

}