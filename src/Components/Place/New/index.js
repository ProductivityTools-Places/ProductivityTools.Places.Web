import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import service from '../../../services/api.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';

const formatPrice = (priceVal) => {
    if (!priceVal) return '';
    const p = Number(priceVal);
    if (!isNaN(p)) {
        if (p <= 100) return "<100";
        if (p <= 200) return "100<price<200";
        if (p <= 300) return "200<price<300";
        return "300<price";
    }
    if (priceVal === '<50' || priceVal === '50<price<100' || priceVal === '<100') return "<100";
    if (priceVal === '100<price<150' || priceVal === '150<price<200' || priceVal === '100<price<200') return "100<price<200";
    if (priceVal === '200<price<250' || priceVal === '250<price<300' || priceVal === '200<price<300') return "200<price<300";
    if (priceVal === '300<price<350' || priceVal === '350<price<400' || priceVal === '400<price' || priceVal === '300<price') return "300<price";
    return priceVal;
};

const getPriceMax = (rangeStr) => {
    if (rangeStr === '<100') return '100';
    if (rangeStr === '100<price<200') return '200';
    if (rangeStr === '200<price<300') return '300';
    if (rangeStr === '300<price') return '1000';
    return rangeStr;
};

function PlaceNew() {
    const [placeEdit, setPlaceEdit] = useState();
    const [mode, setMode] = useState('new')

    let navigate = useNavigate();

    const add = async () => {
        var documentId = await service.newPlace(placeEdit);
        navigate(`/Item/${documentId}`)
    }

    const cancel = async () => {
        navigate("/");
    }

    return (
        <div>
            <h1>Adding new place</h1>
            <TextField label="Name" fullWidth variant="outlined" value={placeEdit?.Name} onChange={(e) => setPlaceEdit({ ...placeEdit, Name: e.target.value })} /><br />
            <TextField label="Description" fullWidth variant="outlined" value={placeEdit?.Description} multiline minRows={3} onChange={(e) => setPlaceEdit({ ...placeEdit, Description: e.target.value })} /><br />
            <TextField label="City" fullWidth variant="outlined" value={placeEdit?.City} onChange={(e) => setPlaceEdit({ ...placeEdit, City: e.target.value })} /><br />
            {placeEdit?.Type && (
                <TextField
                    select
                    label="Type"
                    fullWidth
                    variant="outlined"
                    value={placeEdit?.Type || ''}
                    onChange={(e) => setPlaceEdit({ ...placeEdit, Type: e.target.value })}
                    margin="normal"
                >
                    <MenuItem value="Company">Company</MenuItem>
                    <MenuItem value="Family">Family</MenuItem>
                </TextField>
            )}<br />
            <div style={{ marginTop: '15px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.6)' }}>Rating:</span>
                <Rating
                    name="rating"
                    value={placeEdit?.Rating || 0}
                    onChange={(event, newValue) => {
                        setPlaceEdit({ ...placeEdit, Rating: newValue });
                    }}
                />
            </div>
            <TextField
                select
                label="Price"
                fullWidth
                variant="outlined"
                value={formatPrice(placeEdit?.Price) || ''}
                onChange={(e) => setPlaceEdit({ ...placeEdit, Price: getPriceMax(e.target.value) })}
                margin="normal"
            >
                <MenuItem value="<100">&lt;100</MenuItem>
                <MenuItem value="100<price<200">100&lt;price&lt;200</MenuItem>
                <MenuItem value="200<price<300">200&lt;price&lt;300</MenuItem>
                <MenuItem value="300<price">300&lt;price</MenuItem>
            </TextField><br />

            {/* <span><span>name</span><input type="text" onChange={(e) => setPlaceEdit({ ...placeEdit, Name: e.target.value })}></input></span>
            <span><span>Description</span><input type="text" onChange={(e) => setPlaceEdit({ ...placeEdit,Description: e.target.value })}></input></span>
            <br></br> */}
            <Button variant="contained" color="success" onClick={add}>
                Add
            </Button>
            <Button variant="outlined" color="secondary"  onClick={cancel}>
                Cancel
            </Button>
            <button onClick={add}>Add</button>
            <button onClick={cancel}>Cancel</button>
            <hr></hr>
            <div className="debug">
                value:{placeEdit && placeEdit.Name} 
            </div>
            <hr></hr>
        </div >
    )
}

export default PlaceNew


