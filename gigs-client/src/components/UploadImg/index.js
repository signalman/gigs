import { Button, Box } from '@mui/material';
import React, {  useCallback, useState, useRef } from 'react';
import defaultImage from '../../images/default-image.jpg'
import { updateImage } from '../../utils/Api';

const UploadImg = ({
}) => {

    const [image, setImage] = useState({
        img_file: "",
        preview_URL: defaultImage
    });

    let inputRef;

    const saveImage = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            URL.revokeObjectURL(image.preview_URL);
            const preview_URL = URL.createObjectURL(e.target.files[0]);
            setImage(() => ({
                img_file: e.target.files[0],
                preview_URL: preview_URL
            }))
        }
    }

    const deleteImage = () => {
        setImage({
            img_file: "",
            preview_URL: "defaultImage"
        })
    }

    const imageToServer = async () => {
        if (image.img_file) {
            const formData = new FormData();
            formData.append('file', image.img_file);
            console.log(formData)
            console.log(image.img_file)
            const response = await updateImage(formData)
        }
        else {
            alert("사진을 등록하세요")
        }
    }

    return (
        <>
            <input type="file"
                accept='image/*'
                onChange={saveImage}
                onClick={(e) => e.target.value = null}
                ref={refParam => inputRef = refParam}
                style={{ display: "none" }} />

            <Box sx={{ width: '200px', height: '300px' }}>
                <img style={{ width: '200px', height: '200px' }}
                    src={image.preview_URL} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        sx={{ mr: 2 }}
                        variant="contained"
                        onClick={() => { inputRef.click() }}
                    >변경
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { imageToServer() }}
                    >업로드
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default UploadImg;