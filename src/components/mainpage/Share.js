import React from 'react'
// import "../mainpage/mainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare} from '@fortawesome/free-solid-svg-icons'

export default function Share() {
  return (
    <div className='container-card'>
      <div className="icon">
      <FontAwesomeIcon icon={faShare} /> <br></br> <strong>Shares</strong>
      </div>
      <div className='followers'>2000</div>
      <br></br>
      <span>+14% from last month</span>
    </div>
  )
}
