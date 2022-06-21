import React from "react";
import Genres from "./components/Genres/Genres";
import LandingPage from "./components/LandingPage/LandingPage";
import { NavBar}  from "./components/NavBar/NavBar";
import { Route } from "react-router-dom";
import Videogames from "./components/Videogames/Videogames";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import Form from "./components/Form/Form";
import Filters from "./components/Filters/Filters";


import './App.css';

function App() {
  return (
 <React.Fragment>
   <Route exact path='/' component={LandingPage} />
   {/* <Route path='/home' component={NavBar} />
   <Route path='/home' component={Filters} />
   <Route path='/home' component={Videogames} /> */}
    <Route path='/home'> <NavBar/><Filters/><Videogames/> </Route>
   {/* <Route path= '/videogames' component={Videogames} /> */}
   <Route path='/videogames/:videogameId' component={VideogameDetail} />
   {/* <Route path='/genres' component={Genres} /> */}
   <Route path='/createVideoGame' component={Form} />
   <Route path='/about' />
  </React.Fragment>
  );
}

export default App;
