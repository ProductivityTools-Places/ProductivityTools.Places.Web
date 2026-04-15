import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../../../AppContext';

function VisitThumbnail({ visit }) {
    const { photosBaseUrl } = useContext(AppContext);

    // console.log("thumbnail")
    // console.log(place);
    const defaultThumbnail = "/thumbnail/thumbnail.png";

    const getThumbnail = () => {
        if (visit == undefined) {
            return defaultThumbnail;
        }
        else {
            if (visit.visitThumbnail != undefined) {
                return visit.visitThumbnail;
            }
            else {
                if (visit.Photos && visit.Photos.length > 0) {
                    return visit.Photos[0];
                }
                else {
                    return defaultThumbnail;
                }
            }
        }
    }

    const thumbnail = getThumbnail();
    const src = thumbnail === defaultThumbnail ? defaultThumbnail : (typeof thumbnail === 'string' && thumbnail.startsWith('http') ? thumbnail : `${photosBaseUrl}${thumbnail}`);

    return (
        <div className='thumbnailContainer' >
            <div className='thumbnail crop'>
                <img src={src}></img>
            </div><br />
            <Link to={"Item\\" + visit.Place.id}>{visit.Place.Name} {visit.Date}</Link>
        </div>)
}

export default VisitThumbnail;


