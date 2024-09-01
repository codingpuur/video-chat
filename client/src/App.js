import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import LobbyScreen from './components/LobbyScreen';
import Room from './components/Room';

function App() {
  return (
   <div>


<Routes>
  <Route path="/" element={<LobbyScreen />} />
  <Route path="/room/:roomid" element={<Room/>} />

</Routes>

   </div>
  );
}

export default App;
