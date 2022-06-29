import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import Form from "./components/Form/Form";
import { Login } from "./components/Login/Login";




import './App.css';

function App() {
  return (
 <React.Fragment>
   <Route exact path='/' component={LandingPage} />
   <Route exact path='/logIn' component={Login} />
   <Route path='/home'> <Home/></Route>
   <Route path='/videogames/:videogameId'  component={VideogameDetail}/>
   <Route path='/createVideoGame' component={Form} />
   <Route path='/about' />
  </React.Fragment>
  );
}

export default App;
