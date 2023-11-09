import logo from './logo.svg';
import './App.css';
import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from './components/add-review';
import MovieList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';
import Navbar from './layouts/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar user={"John"}/>
      Hello World!
    </div>
  );
}

export default App;
