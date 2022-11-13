import React from 'react'
import "../mainpage/mainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay} from '@fortawesome/free-solid-svg-icons'


export default function MainPage() {
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
