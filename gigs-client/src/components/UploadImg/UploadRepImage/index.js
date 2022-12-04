import { Button, Box } from '@mui/material';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import defaultImage from '../../../images/default-image.jpg'
import { updateRepImage, deleteRepImage } from '../../../utils/Api';
import Swal from "sweetalert2";

const UploadRepImage = ({ img
}) => {

    const [image, setImage] = useState({
        img_file: "",
        preview_URL: ``
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
        Swal.fire({
            icon: "question",
            title: "삭제",
            text: "대표 이미지를 삭제하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then(async (res) => {
            if (res.isConfirmed) {
                setImage({
                    img_file: "",
                    preview_URL: ""
                })
                const response = await deleteRepImage()
                console.log(response)
            }
        });
    }

    const imageToServer = async () => {
        if (image.img_file) {
            const formData = new FormData();
            formData.append('file', image.img_file);
            console.log(formData)
            console.log(image.img_file)
            const response = await updateRepImage(formData)
        }
        else {
            alert("사진을 등록하세요")
        }
    }

    useEffect(() => {
        console.log(img)
        setImage(() => ({
            preview_URL: `https://gigs-bucket.s3.ap-northeast-2.amazonaws.com/${img}`
        }))
      }, []);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box>
                    <input type="file"
                        accept='image/*'
                        onChange={saveImage}
                        onClick={(e) => e.target.value = null}
                        ref={refParam => inputRef = refParam}
                        style={{ display: "none" }} />

                    <Box sx={{ width: '500px', height: '300px' }}>
                        <img style={{ width: '500px', height: '200px' }}
                            src={image.preview_URL} />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{ mr: 2 }}
                                variant="contained"
                                onClick={() => { inputRef.click() }}
                            >대표 이미지 변경
                            </Button>
                            <Button
                                sx={{ mr: 2 }}
                                variant="contained"
                                onClick={() => { imageToServer() }}
                            >대표 이미지 업로드
                                (서버)
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => { deleteImage() }}
                            >삭제
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default UploadRepImage;