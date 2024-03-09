import React, {useState} from 'react'
import { useUrlTheme } from '../../context/Urls'
import InputBox from '../input_box'
import InfluencerBox from '../influencer_box'
import './urllist.css'

export default function UrlList(){
  const {url_list} = useUrlTheme()
  const [open, setOpen] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const mockItem = {
    comments: "1093",
    date: "3d ago",
    likes: "130K",    
    money: "2322",    
    name: "justt__aniaa",    
    profile_picture_url: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/c9ec768710676a43b3c1590a5359333d~c5_100x100.jpeg?x-expires=1668549600&x-signature=jvPmts8lNE3gj92Ob0YCViB2GzU%3D",    
    profile_url: "https://www.tiktok.com/@justt__aniaa",    
    shares: "1088",    
    title: "La fin sa tête 😂😂😂",    
    video_url: "https://www.tiktok.com/@justt__aniaa/video/7164444903118834949?is_from_webapp=v1",    
    views: "51.4K"
  }
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
      <button className='social_media_platform_box' onClick={handleOpen}>TIKTOK</button>
      {/* {InfluencerBox(mockItem)} */}
      {/* Display Influencer Box List with the video info */}
      {open? 
      url_list.map((item, index)=>{
        const influencer_box = InfluencerBox(item, index)
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