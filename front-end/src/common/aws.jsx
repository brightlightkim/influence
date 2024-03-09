import axios from "axios";

export const uploadVideo = async (video) => {
    let videoUrl = null;

    await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
    .then( async ({data: { uploadURL } }) => {
        await axios({
            method: 'PUT',
            url: uploadURL,
            headers: { 'Content-Type': 'video/mp4' },
            data: video
        })
        .then(() => {
            videoUrl = uploadURL.split("?")[0]
        })
        .catch((err) => {
            throw new Error(err);
        })
    })
    return videoUrl;
}