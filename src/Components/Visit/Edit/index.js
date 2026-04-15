import { useEffect, useState, useContext } from "react"
import { useLocation } from 'react-router-dom'
import service from '../../../services/api.js'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../../../config.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from '../../../AppContext';


function VisitEdit({ updateVisit, placeId, visit }) {
    const { photosBaseUrl } = useContext(AppContext);
    const [vistEdit, setVisitEdit] = useState({ Comment: 'x', Photos: [] });
    const { pathname } = useLocation();
    const [mode, setMode] = useState('new')
    const [files, setFiles] = useState();
    const [uploading, setUploading] = useState(false);
    const [photosToRemove, setPhotosToRemove] = useState([]);

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
                console.log("uploaded photo")
                console.log(r);
                const fileNameOnly = typeof r === 'string' ? r.split('/').pop() : r;
                photos.unshift(fileNameOnly);
            }
            setVisitEdit({ ...vistEdit, Photos: photos });
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload photos.");
        } finally {
            setUploading(false);
        }
    };

    const removePhoto = (photo) => {
        setVisitEdit(prevState => ({ ...prevState, Photos: prevState.Photos.filter(x => x !== photo) }));
        setPhotosToRemove(prevState => [...prevState, photo]);
    }

    const add = () => {
        if (vistEdit.uuid == undefined) {
            vistEdit.uuid = uuidv4();
        }
        console.log(vistEdit);
        updateVisit(vistEdit);
        photosToRemove.forEach(photo => {
            service.deletePhoto(photo);
        });
        setPhotosToRemove([]);
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
            <Button variant="contained" color="success" onClick={add} style={{ marginTop: '10px' }}>
                Add or update visit
            </Button>
            <br />
            <div>Photos:
                {vistEdit && vistEdit.Photos && vistEdit.Photos.map(x => {
                    return (<div>
                        <span>Url: {typeof x === 'string' && x.startsWith('http') ? x : `${photosBaseUrl}${x}`}</span><br></br>
                        <br /><Button variant="contained" color="primary" onClick={() => removePhoto(x)} style={{ marginBottom: '10px' }}>
                            Remove
                        </Button>

                        <div className="crop" style={{ float: 'none' }}>
                            <img src={typeof x === 'string' && x.startsWith('http') ? x : `${photosBaseUrl}${x}`} />
                        </div>
                    </div>)
                })}
            </div>
        </div >


    )
}

export default VisitEdit