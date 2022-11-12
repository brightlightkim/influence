import React, {useState} from 'react'
import { useUrlTheme } from '../../context/Urls'
import InputBox from '../input_box'
import './urllist.css'
export default function UrlList(){
  const {url, handleChange, money, handleMoneyInput, handleClick} = useUrlTheme()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <div className='url_list_container'>
      <button onClick={handleOpen}>Dropdown</button>
      {open ? <InputBox/> : <div>Is Closed</div>}
      
    </div>
  )

}