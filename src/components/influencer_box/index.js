import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay} from '@fortawesome/free-solid-svg-icons'
import { faCommentDots, faShare, faHeart} from '@fortawesome/free-solid-svg-icons'
import './influencer.css'


export default function InfluencerBox(data){
    
    const likes_icon = <FontAwesomeIcon icon="fa-duotone fa-circle-heart" />
    const comment_icon = <FontAwesomeIcon icon="fa-solid fa-comment-dots" />
    const share_icon = <FontAwesomeIcon icon="fa-sharp fa-solid fa-share" />

    return(
        <div className='influencer_box_container' >
            <a href={data.profile_url}>
                <img className='profile_picture' src={data.profile_picture_url} alt={data.name}/>
            </a>
            <div className='text_data_container'>
                <a href={data.profile_url}>{data.name}</a>
                <a href={data.video_url}>{data.title.substring(0,20) + '...'}</a>
                <p>Date: {data.date}</p>
            </div>s
            <div className='skeleton skeleton-text'>
            </div>
            <div>
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
        </div>
    )
}


