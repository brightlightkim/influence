import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay} from '@fortawesome/free-solid-svg-icons'
import { faCommentDots, faShare, faHeart} from '@fortawesome/free-solid-svg-icons'
import './influencer.css'


export default function InfluencerBox(data){

    const data = {
        comments: "20.8K",
        date: "10-13",
        likes: "1.9M",
        money: "5000",
        name: "campingdiary6",
        profile_picture_url: "https://p19-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/5f0683ba796008ab4f375a26d533b4cd~c5_100x100.jpeg?x-expires=1668448800&x-signature=6Pv7sVTH5SC7xpYbZoKmhUyZVa8%3D",
        profile_url: "https://www.tiktok.com/@campingdiary6",
        shares: "30.1K",
        title: "#camp #camping #camplife #outdoors",
        video_url: "https://www.tiktok.com/@campingdiary6/video/7154136248477633834?is_from_webapp=v1",
        views: 0
    }
    
    const likes_icon = <FontAwesomeIcon icon="fa-duotone fa-circle-heart" />
    const comment_icon = <FontAwesomeIcon icon="fa-solid fa-comment-dots" />
    const share_icon = <FontAwesomeIcon icon="fa-sharp fa-solid fa-share" />

    return(
        <div className='influencer_box_container'>
            <a href={data.profile_url}>
                <img className='profile_picture' src={data.profile_picture_url} alt={data.name}/>
            </a>
            <div className='text_data_container'>
                <a href={data.profile_url}>{data.name}</a>
                <a href={data.video_url}>{data.title}</a>
                <p>Date: {data.date}</p>
            </div>
            <div className='data_container'>
                <FontAwesomeIcon icon={faPlay} />
                {data.views}
            </div>
            <div className='data_container'>
                <FontAwesomeIcon icon={faHeart}/>
                {data.likes}
            </div>
            <div className='data_container'>
                <FontAwesomeIcon icon={faCommentDots} />
                {data.comments}
            </div>
            <div className='data_container'>
                <FontAwesomeIcon icon={faShare} />
                {data.shares}
            </div>
        </div>
    )
}


