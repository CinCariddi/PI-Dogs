import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './componets/LandingPage';
import Home from './componets/Home';
import DogCreate from './componets/DogCreate';
import Detail from './componets/Detail'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route path='/dog' element={<DogCreate/>}/>
          <Route path='/home/:id' element={<Detail/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;