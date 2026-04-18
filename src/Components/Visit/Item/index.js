import { useEffect, useState, useContext } from 'react';
import Photo from './photo.js'
import service from '../../../services/api.js';
import { AppContext } from '../../../AppContext';
import Button from '@mui/material/Button'

function VisitItem({ item, editVisit, setPlaceThumbnail, updateVisit }) {
    const { photosBaseUrl } = useContext(AppContext);

    const edit = () => {
        editVisit(item);
    }

    const setVisitThumbnail = (photo) => {
        let visit = { ...item, visitThumbnail: photo }
        updateVisit(visit);
    }

    return (
        <div className="visit" >
            <b>{item && item.Date} </b><span>{item && item.Comment}</span>
            <Button variant="outlined" size="small" onClick={edit} style={{ marginLeft: '10px' }}>
                Edit
            </Button>
            <br /><br />
            {item && item.Photos && item.Photos.map(x => {
                console.log("Photo");
                console.log(x);
                const fullPath = typeof x === 'string' && x.startsWith('http') ? x : `${photosBaseUrl}${x}`;
                return (<Photo setPlaceThumbnail={setPlaceThumbnail} setVisitThumbnail={setVisitThumbnail} photo={fullPath} />)
            })}


        </div>
    )
}

export default VisitItem;