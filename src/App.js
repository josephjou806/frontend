import logo from './logo.svg';
import './App.css';
import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav, Navbar} from 'react-bootstrap';


import AddReview from './components/add-review';
import MovieList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';


function App() {
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
                    { true?(<span>Logout User</span>):(<Link to = {"/login"}>Log In</Link>
                    )}
                    </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>

    </div>
  );
}

export default App;
