import React, {memo, useState} from 'react';
import Axios from 'axios';

const ImageUploadComponent = memo((props)=>{
    const [imgCollection, setImgCollection] = useState('');
    let USER_API_BASE_URL = 'http://localhost:8090';

    const onFileChange = (e) => {
        setImgCollection(e.target.files);
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
        <div className="container">
            <div className="row">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="file" name="imgCollection" onChange={onFileChange} multiple />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
 });

 export default ImageUploadComponent;