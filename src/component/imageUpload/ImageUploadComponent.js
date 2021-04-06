import React, {memo, useState} from 'react';
import Axios from 'axios';
import { Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    uploadDiv: {
        height: `200px`,
        width: '100%',
        overflow: 'auto',
        display: 'flex',
    },
    fileList: {
        height: `30px`,
        verticalAlign: 'middle',
        padding: `5px`,
        backgroundColor: '#dfdfdf',
        marginTop: '10px',
        border: '1px solid #dbabac'
    }
}));
const ImageUploadComponent = memo((props)=>{ 
    const classes = useStyles();
    const [imgCollection, setImgCollection] = useState('');
    const [fileList, setFileList] = useState('');
    let USER_API_BASE_URL = 'http://localhost:8090';

    const onFileChange = (e) => {
        setImgCollection(e.target.files);
        setFileList();
    }

    const onSubmit = (e) => {
        e.preventDefault()

        var formData = new FormData();
        for (const key of Object.keys(imgCollection)) {
            formData.append('imgCollection', imgCollection[key])
        }
        Axios.post(`${USER_API_BASE_URL}/api/upload-images`, formData, {
        }).then(res => {
            console.log(res.data)
        })
    }

    return (
        <div >
            <form onSubmit={onSubmit} className={classes.uploadDiv}>
                <div className="form-group">
                    <input type="file" name="imgCollection" onChange={onFileChange} multiple />
                    <div>
                        <ul>
                            {fileList}
                        </ul>
                    </div>
                </div>
                <div>
                    <Button variant="contained" type="button" onClick={onSubmit}>Upload</Button>
                </div>
            </form>
        </div>
    )
 });

 export default ImageUploadComponent;
 