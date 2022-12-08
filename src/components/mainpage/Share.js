import React from 'react'
// import "../mainpage/mainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare} from '@fortawesome/free-solid-svg-icons'

import { useUrlTheme } from '../../context/Urls';

export default function Share() {
  const {shares} = useUrlTheme()
  return (
    <div className='container-card'>
      <div className="icon">
      <FontAwesomeIcon icon={faShare} /> <br></br> <strong>Shares</strong>
      </div>
      <div className='followers'>{shares}</div>
      <br></br>
      <span>+14% from last month</span>
    </div>
  )
}
