import { faPlay } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import "../mainpage/mainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Views() {
  return (
    <div className='container-card'>
      <div className="icon">
      <FontAwesomeIcon icon={faPlay} /> <br></br> <strong>Views</strong>
      </div>
      <div className='followers'>2000</div>
      <br></br>
      <span>+14% from last month</span>
    </div>
  )
}