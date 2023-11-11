import logo from './logo.svg';
import './App.css';
import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav, Navbar} from 'react-bootstrap';
import { useState } from 'react';

import AddReview from './components/add-review';
import MovieList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';


function App() {
  const [user, setUser] = useState(null);

  async function login(user = null){   // default user to null
    setUser(user);
  }

  async function logout(){
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link>
                    <Link to={"/movies"}>Movies</Link>  
                </Nav.Link>
                <Nav.Link>
                { user ? (<a>Logout User</a>) : (<Link to={"/login"}>Log In</Link>) }
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>

        {/* Switch and Route components to handle routing */}
        <Switch>
          <Route exact path={["/", "/movies"]} component={MovieList}></Route>
          <Route path="/movies/:id/review" render={(props)=> <AddReview {...props} user={user}/> }></Route>
          <Route path="/movies/:id/" render={(props) => <Movie {...props} user={user}/>}></Route>
          <Route path="/login" render={(props) => <Login {...props} login={login}/>} ></Route>
          {/* ...other routes */}
      </Switch>

    </div>
  );
}

export default App;
