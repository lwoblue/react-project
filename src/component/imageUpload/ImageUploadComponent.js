import React, {memo, useState} from 'react';
import Axios from 'axios';
import { Button, makeStyles} from '@material-ui/core';

import MainSlideService from '../../api/MainSlideService';

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

    const onFileChange = (e) => {
        setImgCollection(e.target.files);
        setFileList();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
            "content-type": "multipart/form-data",
            },
        };
        const formData = new FormData();
        for (const key of Object.keys(imgCollection)) {
            if(imgCollection[key].size > 2097152){
                alert("파일 크기는 2MB를 넘을 수 없습니다.");
                return false;
            }
            console.log(imgCollection[key]);
            formData.append('file', imgCollection[key])
        }
        
        await MainSlideService.uploadImage(formData,config)
        .then((res) => {
            console.log(res.data.resultData);
        })
        .catch((err) => {
            alert("실패");
        });

    }

    return (
        <div >
            <form className={classes.uploadDiv}>
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
 