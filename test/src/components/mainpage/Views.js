import { faPlay } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import "./mainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import calculateData from './calculate_helper';
import { useUrlTheme } from '../../context/Urls';

export default function Views() {
  const {views} = useUrlTheme()
  return (
    <div className='container-card'>
      <div className="icon">
      <FontAwesomeIcon icon={faPlay} /> <br></br> <strong>Views</strong>
      </div>
      <div className='followers'>{views}</div>
      <br></br>
      <span>+14% from last month</span>
    </div>
  )
}
