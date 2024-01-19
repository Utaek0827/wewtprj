import logo from './logo.svg';
import './App.css';
import Album from './album/Album';  // 파일 경로에 따라 수정하세요.
import Board from './board/Board';


function App() {
  return (
    <div>
      <Album />
      <Board />
    </div>
  );
}

export default App;
