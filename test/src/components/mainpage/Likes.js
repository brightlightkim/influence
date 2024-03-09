import React from 'react'
import "./mainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons'

import { useUrlTheme } from '../../context/Urls';

export default function Likes() {
  const {likes} = useUrlTheme()
  return (
    <div className='container-card'>
      <div className="icon">
      <FontAwesomeIcon icon={faHeart} /> <br></br> <strong>Likes</strong>
      </div>
      <div className='followers'>{likes}</div>
      <br></br>
      <span>+14% from last month</span>
    </div>
  )
}
