import { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import About from './components/About';
import JoinChat from './components/JoinChat';
import Chat from './components/Chat';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <div className="App">

      <Router>

        <Navbar />
        <Alert alert={alert} />
        

        <div className="container">

          <Routes>

            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login showAlert={showAlert} />} />
            <Route path='/signup' element={<SignUp showAlert={showAlert} />} />
            <Route path='/joinchat' element={<JoinChat showAlert={showAlert} />} />
            <Route path='/chat' element={<Chat showAlert={showAlert} />} />
            
          </Routes>
        
        </div>


      </Router>














    </div>
  );
}

export default App;
