import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../../../AppContext';

function Thumbnail({ place, thumbnail }) {
    const { photosBaseUrl } = useContext(AppContext);

    // console.log("thumbnail")
    // console.log(place);
    const defaultThumbnail = "/thumbnail/thumbnail.png";
    const src = thumbnail ? (typeof thumbnail === 'string' && thumbnail.startsWith('http') ? thumbnail : `${photosBaseUrl}${thumbnail}`) : defaultThumbnail;
    const types = [...new Set([place?.Type, ...(place?.Visits?.map(v => v.Type) || [])].filter(Boolean))];

    return (
        <div className='thumbnailContainer' >
            <div className='thumbnail crop'>
                <img src={src}></img>
                {types.length > 0 && (
                    <div className="overlayContainer">
                        {types.map(t => (<div key={t} className="typeOverlay">{t}</div>))}
                    </div>
                )}
            </div><br />
            <Link to={"Item\\" + place.id}>{place.Name}</Link> - {place.City}, Ilość wizyt: {place.Visits?.length || 0}, Ostatnia: {place.Visits?.sort((a, b) => new Date(b.Date) - new Date(a.Date))[0]?.Date}
        </div>)
}

export default Thumbnail;


