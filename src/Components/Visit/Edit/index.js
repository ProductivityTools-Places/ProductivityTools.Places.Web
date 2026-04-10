import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom'
import service from '../../../services/api.js'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../../../config.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function VisitEdit({ updateVisit, placeId, visit }) {
    const [vistEdit, setVisitEdit] = useState({ Comment: 'x', Photos: [] });
    const { pathname } = useLocation();
    const [mode, setMode] = useState('new')
    const [files, setFiles] = useState();
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (pathname == '/VisitNew') {
            setMode('new')
        } else {
            setMode('edit')
        }
    }, [])

    useEffect(() => {
        setVisitEdit(visit);
        console.log("UseEffect set visit")
        console.log(visit);
    }, [visit])


    const onFileChange = event => {
        console.log(vistEdit);
        debugger;
        const chosenFiles = Array.prototype.slice.call(event.target.files)

        setFiles(chosenFiles);
        console.log(chosenFiles)

    };

    const onFileUpload = async () => {
        if (!files || files.length === 0) return;
        setUploading(true);
        try {
            let photos = vistEdit?.Photos || []
            for (const file of files)
            {
                var r = await service.uploadPhoto(file, placeId);
                photos.push(r);
            }
            setVisitEdit({ ...vistEdit, Photos: photos });
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload photos.");
        } finally {
            setUploading(false);
        }
    };

    const add = () => {
        if (vistEdit.uuid == undefined) {
            vistEdit.uuid = uuidv4();
        }
        console.log(vistEdit);
        updateVisit(vistEdit);
    }



    return (
        <div>VisitEditpm
            <div>Mode: {mode}</div>
            <TextField label="Date" fullWidth variant="outlined" value={vistEdit?.Date} onChange={(e) => setVisitEdit(prevState => ({ ...prevState, Date: e.target.value }))} style={{ marginBottom: '10px' }} /><br />
            <TextField label="Comment" fullWidth variant="outlined" value={vistEdit?.Comment} onChange={(e) => setVisitEdit(prevState => ({ ...prevState, Comment: e.target.value }))} style={{ marginBottom: '10px' }} /><br />
            Photos:
            <input type="file" multiple onChange={onFileChange} style={{ marginBottom: '10px' }} />
            <Button variant="contained" color="primary" onClick={onFileUpload} disabled={uploading} style={{ marginBottom: '10px' }}>
                {uploading ? 'Uploading...' : 'Upload!'}
            </Button>
            {uploading && <span style={{ marginLeft: '10px' }}>⏳ Uploading...</span>}

            {console.log(files)}
            <span>file: {files && files?.map(x => { return (<span>{x.name}</span>) })}</span>
            <span>{vistEdit && vistEdit.Comment}</span>
            <br />
            <span>Photos:
                {vistEdit && vistEdit.Photos && vistEdit.Photos.map(x => {
                    return (<span>
                        <span>{x}</span>
                        obrazek
                        <div className="crop">
                            <img src={x} />
                        </div>
                    </span>)
                })}
            </span><br />
            <Button variant="contained" color="success" onClick={add} style={{ marginTop: '10px' }}>
                Add or update visit
            </Button>
        </div >

    )
}

export default VisitEdit