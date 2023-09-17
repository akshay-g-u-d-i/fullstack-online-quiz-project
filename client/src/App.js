import Home from './screens/Home.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import Signup from './screens/Signup';
import Questions from './screens/Questions';

 

export default function App() {
  return (
    <Router className="App">
        <Routes>
          <Route exact path = "/" element={<Home />} />
          <Route exact path = "/login" element = {<Login />} />
          <Route exact path = "/signup" element = {<Signup />} />
          <Route exact path = '/questions' element = {<Questions />} />

        </Routes>
    </Router>
  );
}

