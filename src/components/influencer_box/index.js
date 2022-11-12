import './influencer.css'

export default function InfluencerBox(data){
    return(
        <div className='influencer_box_container'>
            <a href={data.profile_url}>
                <img className='profile_picture' src={data.profile_picture_url} />
            </a>
            <div className='text_data_container'>
                <a href={data.profile_url}>{data.name}</a>
                <a href={data.video_url}>{data.title}</a>
                <p>Date: {data.date}</p>
            </div>
            <div className='data_container'>
                <img src='' alt='views'/>
            </div>
            <div className='data_container'>
                <img src='' alt='likes'/>
            </div>
            <div className='data_container'>
                <img src='' alt='comments'/>
            </div>
            <div className='data_container'>
                <img src='' alt='shares'/>
            </div>
        </div>
    )
}