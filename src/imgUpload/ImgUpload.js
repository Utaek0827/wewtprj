import React, { useState } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const ImgUplad = () => {
    const [file, setFile] = useState(null);
    const [service, setService] = useState("");
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleServiceChange = (e) => {
      setService(e.target.value);
    };
  
    const handleUpload = () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("service", service);
  
      // memberId와 key를 헤더에 추가
      const headers = {
        memberId: "testid", // 실제 memberId 값을 입력하세요
        key: "testkey", // 실제 key 값을 입력하세요
      };
  
      axios.post("/api/upload", formData, { headers })
        .then(response => {
          console.log(response.data);
          window.location.reload(); // 페이지 새로고침

          // 파일 업로드 성공 시의 처리
        })
        .catch(error => {
          console.error("Error uploading file:", error);
          alert("파일 저장 실패");
          window.location.reload(); // 페이지 새로고침
          // 파일 업로드 실패 시의 처리
        });
    };
  
    return (
      <div>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
    </Button>
    
      <input type="text" id="outlined-basic" placeholder="Service" value={service} onChange={handleServiceChange} />
      <button onClick={handleUpload}>Upload</button>
      </div>
    );
};

export default ImgUplad;
