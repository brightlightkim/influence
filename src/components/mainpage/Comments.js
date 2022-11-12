import React from 'react'
import "../mainpage/mainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots} from '@fortawesome/free-solid-svg-icons'

export default function Comments() {
  return (
    <div className='container-card'>
      <div className="icon">
      <FontAwesomeIcon icon={faCommentDots} /> <br></br> <strong>Coments</strong>
      </div>
      <div className='followers'>2000</div>
      <br></br>
      <span>+11% from last month</span>
    </div>
  )
}
