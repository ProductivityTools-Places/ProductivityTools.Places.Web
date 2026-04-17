import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import service from '../../../services/api.js'
import VisitEdit from '../../Visit/Edit/index.js';
import VisitItem from '../../Visit/Item'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

function PlaceItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [place, setPlace] = useState();
    const [updatePlace, setUpdatePlace] = useState(false)
    const [mode, setMode] = useState(null);
    const [editedVisit, setEditedVisit] = useState(null);

    useEffect(() => {
        const call = async () => {
            let result = await service.getPlace(id);
            setPlace(result);
        }
        call();
    }, [])

    const editPlace = () => {
        setMode('editPlace')
    }

    const newVisit = () => {
        setMode('newVisit')
    }

    const editVisit = (item) => {
        setMode('editVisit')
        setEditedVisit(item);
    }

    const setPlaceThumbnail = async (url) => {
        let x = { ...place, 'Thumbnail': url }
        let result = await service.updatePlace(x)
        return result;
        setPlace({ ...place, 'Thumbnail': url });
    }

    //here it is called to often, every time page is loading
    // useEffect(() => {
    //     savePlace();
    // }, [place?.Thumbnail])

    const updateVisit = async (visit) => {
        debugger;
        console.log(visit);
        if (place.Visits == undefined) {
            place.Visits = [];
        }
        let placeVisits = place.Visits;

        let elementInArray = false;
        for (var i = 0; i < placeVisits.length; i++) {
            if (placeVisits[i].uuid == visit.uuid) {
                placeVisits[i] = { ...placeVisits[i], ...visit }
                elementInArray = true;
                break
            }
        }
        if (elementInArray == false) {
            placeVisits.push(visit);
        }
        debugger;
        let result = await savePlace();

        setPlace(prevState => ({
            ...prevState, Visits: placeVisits
        }))
        console.log("updatevisit, does place have visits?")
        console.log(place);
        setMode('visitList');
    }

    const savePlace = async () => {
        let result = await service.updatePlace(place)
        navigate('/');
        return result;
    }

    const deletePlace = async () => {
        if (window.confirm("Are you sure you want to delete this place?")) {
            await service.deletePlace(id);
            navigate('/');
        }
    }

    const renderVisits = () => {
        if (mode == 'newVisit') {
            return (
                <VisitEdit updateVisit={updateVisit} placeId={place.id} />
            )
        }
        else if (mode == 'editVisit') {
            return (
                <VisitEdit updateVisit={updateVisit} visit={editedVisit} placeId={place.id} />
            )
        }
        else {
            return (
                <>
                    <span>Visits:</span>
                    {console.log(place)}
                    {console.log(place?.visits)}
                    {place && place.Visits && place.Visits.map(x => {
                        return (<VisitItem editVisit={editVisit} updateVisit={updateVisit} setPlaceThumbnail={setPlaceThumbnail} item={x}></VisitItem>)
                    })}

                    <div className="newLine">
                        <Button variant="contained" color="primary" onClick={newVisit}>New visit</Button>
                    </div>
                </>
            )
        }
    }

    const renderPlace = () => {
        if (mode == 'editPlace') {
            return (
                <div className="editPlace">
                    <TextField label="Name" fullWidth variant="outlined" value={place?.Name} onChange={(e) => setPlace(prevState => ({ ...prevState, Name: e.target.value }))} margin="normal" />
                    <TextField label="Description" fullWidth variant="outlined" value={place?.Description} multiline minRows={3} onChange={(e) => setPlace(prevState => ({ ...prevState, Description: e.target.value }))} margin="normal" />
                    <TextField label="City" fullWidth variant="outlined" value={place?.City} onChange={(e) => setPlace(prevState => ({ ...prevState, City: e.target.value }))} margin="normal" />

                    <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                        <Button variant="contained" color="primary" onClick={savePlace} style={{ marginRight: '10px' }}>
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setMode(null)} style={{ marginRight: '10px' }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="error" onClick={deletePlace}>
                            Delete place
                        </Button>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <h2>{place && place.Name}<button className='editLink' onClick={editPlace}></button> </h2>
                    <p className="description">Description: {place && place.Description}</p>
                    <p className="description">City: {place && place.City}</p>
                </>
            )
        }
    }


    return (
        <div>
            <Link to='/'>Home</Link>
            {renderPlace()}
            {renderVisits()}
            <hr></hr>
            <div className='debug'>
                <p>id: {id}</p>
                <p>PlaceId: {place && place.id}</p>
            </div>
        </div>

    )
}

export default PlaceItem;