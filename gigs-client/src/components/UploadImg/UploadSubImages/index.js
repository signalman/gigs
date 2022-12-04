import { Button, Box } from '@mui/material';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { updateSubImage, deleteImage } from '../../../utils/Api';
import Swal from "sweetalert2";

const UploadSubImages = ({ img
}) => {

    const [subDataImage, setSubDataImage] = useState([]);

    const [subNewDataImage, setSubNewDataImage] = useState([]);

    const [subImage, setSubImage] = useState({
        id: 0,
        img_file: "",
        preview_URL: ""
    });

    let subInputRef;

    const saveSubImage = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            URL.revokeObjectURL(subImage.preview_URL);
            const preview_URL = URL.createObjectURL(e.target.files[0]);
            setSubImage(() => ({
                id: subImage.id + 1,
                img_file: e.target.files[0],
                preview_URL: preview_URL
            }))
            setSubDataImage((p) => ([...p, {
                id: subImage.id,
                img_file: e.target.files[0],
                preview_URL: preview_URL
            }]))
            setSubNewDataImage((p) => ([...p, {
                id: subImage.id,
                img_file: e.target.files[0],
                preview_URL: preview_URL
            }]))
        }
    }

    const deleteSubImage = (id) => {
        Swal.fire({
            icon: "question",
            title: "삭제",
            text: `이미지를 삭제하시겠습니까?`,
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then(async (res) => {
            if (res.isConfirmed) {
                const tmpData = subDataImage.filter((it) => it.id !== id)
                console.log(tmpData)
                for (let i = id; i < tmpData.length; i += 1) {
                    tmpData[i].id = tmpData[i].id - 1
                }
                console.log(tmpData)
                setSubDataImage(tmpData)
                subImage.id = subImage.id - 1
                const response = await deleteImage(id)
                //console.log(subDataImage)
                // console.log(subImage)
                console.log(response)
            }
        });
    }

    const subImageToServer = async () => {
        if (subNewDataImage.length !== 0) {
            const formData = new FormData();
            // const imgArray = []
            // formData.append('file', subDataImage);

            for (let i = 0; i < subNewDataImage.length; i += 1) {
                formData.append('files', subNewDataImage[i].img_file)
                // imgArray.push(subDataImage[i].img_file)
                console.log(subNewDataImage[i].img_file)
            }
            console.log(formData)
            // console.log(imgArray)
            //const response = await updateImage(formData)
            const response = await updateSubImage(formData)
            console.log(response)
        }
        else {
            alert("사진을 등록하세요")
        }
    }

    useEffect(() => {
        console.log(img)

        for (const key in img) {
            setSubDataImage((p) => ([...p, {
                id: img[key].starImgId,
                img_file: "",
                preview_URL: `https://gigs-bucket.s3.ap-northeast-2.amazonaws.com/${img[key].url}`
            }]))
            setSubImage(() => ({
                id: img[key].starImgId + 1,
            }))

        }
      }, [img]);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ ml: 10 }}>
                    {subDataImage.length !== 0 ? (subDataImage.map((img) => {
                        console.log(img)
                        return (
                            <Box sx={{ display: 'flex' }}>
                                <img style={{ width: '50px', height: '50px' }} src={img.preview_URL} key={img.id} ></img>
                                <Button
                                    sx={{}}
                                    onClick={() => { deleteSubImage(img.id) }}
                                >삭제
                                </Button>
                            </Box>
                        )
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
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default UploadSubImages;