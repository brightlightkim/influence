import React, {useState} from 'react'
import { useUrlTheme } from '../../context/Urls'
import InputBox from '../input_box'
import InfluencerBox from '../influencer_box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './urllist.css'

export default function FacebookList(){
  const {url_list} = useUrlTheme()
  const [open, setOpen] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
    if(isAdd){
      handleAdd()
    }
  }

  const handleAdd = () => {
    setIsAdd(!isAdd)
  }
  
  return (
    <div className='url_list_container'>
      <button className='social_media_platform_box' onClick={handleOpen}>FACEBOOK</button>
      

      {/* Display Influencer Box List with the video info */}
      {open? 
      url_list.map((item, index)=>{
        /**
         * If (item.title === 'loading'){
         *    return loadingbox
         * } else{ 
         *    const influencer_box = InfluencerBox(item)
         *    return influencer_box
         * }
         *  
         */ 
        const influencer_box = InfluencerBox(item)
        return influencer_box
      }): <></>}

      {/* Display Input Box */}
      {
        (()=>{
          if (open && !isAdd){
            return <button onClick={handleAdd} className='add_button'>+</button>
          }
          else if (open && isAdd){
            return <InputBox/>
          }
        })()
      }
    </div>
  )

}