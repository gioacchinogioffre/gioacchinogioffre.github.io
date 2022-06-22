import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import { NavBar}  from "./components/NavBar/NavBar";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import Form from "./components/Form/Form";



import './App.css';

function App() {
  return (
 <React.Fragment>
   <Route exact path='/' component={LandingPage} />
   <Route path='/home'> <NavBar/><Home/> </Route>
   <Route path='/videogames/:videogameId' component={VideogameDetail} />
   {/* <Route path='/genres' component={Genres} /> */}
   <Route path='/createVideoGame' component={Form} />
   <Route path='/about' />
  </React.Fragment>
  );
}

export default App;
