import { Link } from 'react-router-dom'

function Thumbnail({ place, thumbnail }) {

    // console.log("thumbnail")
    // console.log(place);
    const defaultThumbnail = "/thumbnail/thumbnail.png";
    return (
        <div className='thumbnailContainer' >
            <div className='thumbnail crop'>
                <img src={thumbnail ?? defaultThumbnail}></img>
            </div><br />
            <Link to={"Item\\" + place.id}>{place.Name}</Link>[{place.City}] ({place.Visits?.length || 0})
        </div>)
}

export default Thumbnail;


