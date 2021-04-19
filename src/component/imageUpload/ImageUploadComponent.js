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
    const [imgFiles, setImgFiles] = useState('');
    let USER_API_BASE_URL = 'http://localhost:8090';
    const setItems = props.setItems;
    const minCnt = props.minCount;
    const onFileChange = (e) => {
        setImgFiles(e.target.files);
        // setFileList();
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log()
        if(imgFiles.length === 0) return;
        let imgCnt = 0;
        var formData = new FormData();
        for (const key of Object.keys(imgFiles)) {
            imgCnt++;
            formData.append('img-files', imgFiles[key])
        }
        if(imgCnt < minCnt) {
            alert(`최소 ${minCnt} 이상의 이미지를 업로드해 주세요.`);
            return;
        }
        Axios.post(`${USER_API_BASE_URL}/api/clear-images`, {
        }).then(res => {
            console.log('clear-images');
        });
        
        Axios.post(`${USER_API_BASE_URL}/api/upload-images`, formData, {
        }).then(res => {
            const tmpfileArray = res.data.data;
            if(tmpfileArray.length > 0){
                const fileArray = [];
                for(let idx = 0; idx < tmpfileArray.length; idx++){
                    let tmpArray = {id:(idx+1), url: `http://localhost:3000/images/slide-img/${tmpfileArray[idx].fileName}`};
                    fileArray.push(tmpArray);
                }
                setItems(fileArray);
            }
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit} className={classes.uploadDiv}>
                <div className="form-group">
                    <input type="file" name="img-files" onChange={onFileChange} multiple />
                </div>
                <div>
                    <Button variant="contained" type="button" onClick={onSubmit}>Upload</Button>
                </div>
            </form>
        </div>
    )
 });

 export default ImageUploadComponent;
 