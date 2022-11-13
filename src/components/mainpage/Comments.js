import React from 'react'
import "../mainpage/mainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots} from '@fortawesome/free-solid-svg-icons';
import {useUrlTheme} from '../../context/Urls'

export default function Comments() {
  const {url_list, url } = useUrlTheme()
  var commentsArr = []
  for (let i = 0; i < url_list.length; i++){
    commentsArr.append(url_list[i].comments)
  }
  var countComments = 0
  commentsArr.map((item) =>{
    countComments += parseInt(item)
  })
  return (
    <div className='container-card'>
      <div className="icon">
      <FontAwesomeIcon icon={faCommentDots} /> <br></br> <strong>Coments</strong>
      </div>
      <div className='followers'>{countComments}</div>
      <br></br>
      <span>+11% from last month</span>
    </div>
  )
}
