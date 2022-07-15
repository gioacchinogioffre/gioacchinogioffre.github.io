import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import Form from "./components/Form/Form";
import FAQ from "./components/FAQ/FAQ";
import { Login } from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";

import './App.css';

function App() {
  return (
 <React.Fragment>
  <Switch>
   <Route exact path='/' component={LandingPage} />
   <Route exact path='/logIn' component={Login} />
   <Route exact path='/home'> <Home/></Route>
   <Route exact path='/profile'> <Profile/></Route>
   <Route path='/videogames/:videogameId'  component={VideogameDetail}/>
   <Route exact path='/createVideoGame' component={Form} />
   <Route exact path='/faq' component={FAQ} />
   <Route component={NotFound}  />
  </Switch>
  </React.Fragment>
  );
}

export default App;
