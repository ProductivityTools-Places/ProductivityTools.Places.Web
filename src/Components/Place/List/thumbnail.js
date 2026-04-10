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
            <Link to={"Item\\" + place.id}>{place.Name}</Link> - {place.City}, Ilość wizyt: {place.Visits?.length || 0}, Ostatnia: {place.Visits?.sort((a, b) => new Date(b.Date) - new Date(a.Date))[0]?.Date}
        </div>)
}

export default Thumbnail;


