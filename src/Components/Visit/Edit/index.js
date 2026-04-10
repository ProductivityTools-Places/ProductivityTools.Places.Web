import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom'
import service from '../../../services/api.js'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../../../config.js'


function VisitEdit({ updateVisit, placeId, visit }) {
    const [vistEdit, setVisitEdit] = useState({ Comment: 'x', Photos: [] });
    const { pathname } = useLocation();
    const [mode, setMode] = useState('new')
    const [files, setFiles] = useState();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => {
            window.gapi.load('picker', { 'callback': () => console.log('Picker loaded') });
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

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
        let photos = vistEdit?.Photos || []
        for (const file of files)
        {
            var r = await service.uploadPhoto(file, placeId);
            photos.push(r);
            console.log("onFileUpload");
            console.log(r);
        }

        console.log("photos");
        console.log(photos);

        setVisitEdit({ ...vistEdit, Photos: photos });

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
            <div>Date:<input type="text" value={vistEdit?.Date} onChange={(e) => setVisitEdit(prevState => ({ ...prevState, Date: e.target.value }))}></input></div>
            <div>Commment: <input type="text" value={vistEdit?.Comment} onChange={(e) => setVisitEdit(prevState => ({ ...prevState, Comment: e.target.value }))}></input></div>
            Photos:
            <input type="file" multiple onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload!
            </button>

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
            <button onClick={add}>Add or update visit</button>
        </div >

    )
}

export default VisitEdit