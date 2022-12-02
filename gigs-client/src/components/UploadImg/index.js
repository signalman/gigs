import { Button, Box } from '@mui/material';
import React, { useCallback, useState, useRef } from 'react';
import defaultImage from '../../images/default-image.jpg'
import { updateRepImage, updateSubImage, deleteRepImage } from '../../utils/Api';
import Swal from "sweetalert2";

const UploadImg = ({ img
}) => {

    const [image, setImage] = useState({
        img_file: "",
        preview_URL: img
    });

    const [subDataImage, setSubDataImage] = useState([]);

    const [subImage, setSubImage] = useState({
        img_file: "",
        preview_URL: img
    });

    let inputRef;

    let subInputRef;

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

    const saveSubImage = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            URL.revokeObjectURL(subImage.preview_URL);
            const preview_URL = URL.createObjectURL(e.target.files[0]);
            setSubImage(() => ({
                img_file: e.target.files[0],
                preview_URL: preview_URL
            }))
            setSubDataImage((p) => ([...p, {
                img_file: e.target.files[0],
                preview_URL: preview_URL
            }]))
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
                    preview_URL: defaultImage
                })
                const response = await deleteRepImage()
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

    const subImageToServer = async () => {
        if (subDataImage.length !== 0) {
            const formData = new FormData();
            const imgArray = []
            console.log(subDataImage)
            formData.append('file',subDataImage);

            // for (let i = 0; i < subDataImage.length; i += 1) {
            //     formData.append(`file${i}`, subDataImage[i].img_file)
            //     imgArray.push(subDataImage[i].img_file)
            //     console.log(subDataImage[i].img_file)
            // }
            console.log(formData)
            console.log(imgArray)
            //const response = await updateImage(formData)
            const response = await updateSubImage(formData)
        }
        else {
            alert("사진을 등록하세요")
        }
    }

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
                <Box sx={{ ml: 10 }}>
                    {subDataImage.length !== 0 ? (subDataImage.map((img) => {
                        return <img style={{ width: '100px', height: '100px' }} src={img.preview_URL} key={img} />
                    }))
                        : <></>}
                    <input type="file"
                        accept='image/*'
                        onChange={saveSubImage}
                        onClick={(e) => e.target.value = null}
                        ref={refParam => subInputRef = refParam}
                        style={{ display: "none" }} />

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            sx={{ mr: 2 }}
                            variant="contained"
                            onClick={() => { subInputRef.click(); }}
                        >서브 이미지 추가
                        </Button>
                        <Button
                            sx={{ mr: 2 }}
                            variant="contained"
                            onClick={() => { subImageToServer() }}
                        > 서브 이미지 업로드
                        </Button>
                        <Button
                            sx={{ mr: 2 }}
                            variant="contained"
                            onClick={() => {}}
                        > 여러 이미지 중 선택 삭제는 아직..
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default UploadImg;