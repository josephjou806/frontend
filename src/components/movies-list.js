import React from "react";
import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

import { Form, Button, Col, Row, Container, Card } from "react-bootstrap";


function MovieList(props) {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    useEffect(() => {
        // A function to retrieve movies would go here
        retrieveMovies();
        retrieveRatings();
      }, []);
    
    const retrieveMovies = () => {
    // Implementation for retrieving movie data from the service
    MovieDataService.getAll()
        .then (response => {
            console.log(response.data);
            setMovies(response.data.movies);
            }
        )
        .catch(e => {
            console.log(e);
            }
        );
    }

    // Function to retrieve ratings
    const retrieveRatings = () => {
            MovieDataService.getRatings()
                .then(response => {
                    // Log the response data from the server
                    console.log(response.data);
                    // Update the 'ratings' state, prepending 'All Ratings' to the data from the server
                    setRatings(["All Ratings"].concat(response.data));
                    }
                )
            .catch(e => {
                // Log any errors to the console
                console.log(e);
                }
            )
        }

        const find = (query, by) => {
            MovieDataService.find(query, by)
              .then(response => {
                console.log(response.data);
                setMovies(response.data.movies); // Assuming the API response has a 'movies' key
              })
              .catch(e => {
                console.log(e);
              });
          };

        const findByTitle = () => {
            find(searchTitle, "title")
        };
          
        const findByRating = () => {
            if(searchRating === "All Ratings"){
                retrieveMovies();
            }
            else {
                find(searchRating, "rated");
            }
        };
    
    // This function is called every time the input field for the search title changes
    const onChangeSearchTitle = e => {
        // Retrieve the new value of the input field from the event object
        const searchTitle = e.target.value;
        // Update the state with the new value of the search title
        setSearchTitle(searchTitle);
    };
    
    // This function is called every time the input field for the search rating changes
    const onChangeSearchRating = e => {
        // Retrieve the new value of the input field from the event object
        const searchRating = e.target.value;
        // Update the state with the new value of the search rating
        setSearchRating(searchRating);
    };


    return (
         <div className="App">
            <Container>
            <Form>
                <Row>
                <Col>
                    <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    </Form.Group>
                    {/* Button to trigger search by title */}
                    <Button variant="primary" type="button" onClick={findByTitle}>
                    Search
                    </Button>
                </Col>

                {/* Column for the rating search select */}
                <Col>
                    <Form.Group>
                    <Form.Control as="select" onChange={onChangeSearchRating}>
                        {/* Map through the ratings array to create select options */}
                        {ratings.map(rating => (
                        <option value={rating}>{rating}</option>
                        ))}
                    </Form.Control>
                    </Form.Group>
                    {/* Button to trigger search by rating */}
                    <Button variant="primary" type="button" onClick={findByRating}>
                    Search
                    </Button>
                </Col>
                </Row>
            </Form>
            <Row>
            {movies.map((movie) => (
                <Col key={movie._id} sm={12} md={6} lg={4}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movie.poster + "/100px180"} />
                    <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                        Rating: {movie.rated}
                    </Card.Text>
                    <Card.Text>
                        {movie.plot}
                    </Card.Text>
                    <Link to={"/movies/" + movie._id}>View Reviews</Link>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>


            </Container>
        </div>
    )
    
}

export default MovieList;