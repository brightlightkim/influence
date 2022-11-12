import './influencer.css'

export default function InfluencerBox(data){
    
    const play_icon = require('../../static/play.png')
    const likes_icon = require('../../static/heart.png')
    const comment_icon = require('../../static/comment.png')
    const share_icon = require('../../static/share.png')

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
                <img src={play_icon} alt='views'/>
                {data.views}
            </div>
            <div className='data_container'>
                <img src={likes_icon} alt='likes'/>
                {data.likes}
            </div>
            <div className='data_container'>
                <img src={comment_icon} alt='comments'/>
                {data.comments}
            </div>
            <div className='data_container'>
                <img src={share_icon} alt='shares'/>
                {data.shares}
            </div>
        </div>
    )
}