import logo from './logo.svg';
import './App.css';
import Album from './album/Album';  // 파일 경로에 따라 수정하세요.
import Board from './board/Board';
import ImgListPage from './ImgListPage';
import ImgUplad from './imgUpload/ImgUpload';


function App() {
  return (
    <div>
      {/* <Album />
      <Board /> */}
      <ImgUplad />
      <ImgListPage />
    </div>
  );
}

export default App;
