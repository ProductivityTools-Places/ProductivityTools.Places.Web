import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import service from '../../../services/api.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';

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


