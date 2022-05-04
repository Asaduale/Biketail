import React, { useState } from 'react';
import '../../css/Seller/image.css';
import {Button} from '@mui/material';

import UploadIcon from '@mui/icons-material/Upload';
import {addImage} from '../../../actions/image'

export default function ImageDrop() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log("class stuff is " + JSON.stringify(files))
        console.log(files);
        addImage(e.target[0]);
    }
    return (
        <form className="image-form" onSubmit={(e) => {
            e.preventDefault();
            console.log("e.target is " + e.target)
            addImage(e.target);
        }}>
            <div class="image-form__field">
                <label>Image:</label>
                <input name="image" type="file" />
            </div>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className="image-form__submit-button"
            >
                Upload
            </Button>
        </form>
    )
}
