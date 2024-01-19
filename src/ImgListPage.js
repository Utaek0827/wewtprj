import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImgListPage.css';
import Button from '@mui/material/Button';


const ImgListPage = () => {
  const [imgList, setImgList] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  function formatMillisecondString(millisecondString) {
    const dateInMillis = parseInt(millisecondString, 10);
    return new Date(dateInMillis).toLocaleString();
  }

  function formatFileSize(bytes) {
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return bytes + ' bytes';
    }
  }

  const handleClick = (img) => {
    axios.get("/api/"+img.m_service+"/"+img.img_channame, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(new Blob([response.data]));
        setSelectedImg(url);
        setShowModal(true);
        copyToClipboard(`http://utimg.duckdns.org/api/${img.m_service}/${img.img_channame}`);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1000);
  };

  useEffect(() => {
    axios.get('/api/imgList/testid')
      .then(response => setImgList(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); 

  return (
    <div>
      <h1>Image List</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>이미지 이름</th>
              <th>유형</th>
              <th>크기</th>
              <th>수정일</th>
              <th>폴더명</th>
              <th>이미지 url</th>
            </tr>
          </thead>
          <tbody>
            {imgList.map(img => (
              <tr key={img.img_oriname}>
                <td>{img.img_oriname}.{img.img_ext}</td>
                <td>{img.img_ext}</td>
                <td>{formatFileSize(img.img_size)}</td>
                <td>{formatMillisecondString(img.img_uptime)}</td>
                <td>{img.m_service}</td>
                <td>
                  <span
                    onClick={() => handleClick(img)}
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    {`http://utimg.duckdns.org/api/${img.m_service}/${img.img_channame}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <img src={selectedImg} alt={selectedImg} />
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}

      {copySuccess && (
        <div style={{ color: 'green', marginTop: '10px' }}>
          링크가 복사되었습니다.
        </div>
      )}
    </div>
  );
};

export default ImgListPage;
