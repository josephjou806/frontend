import React from "react";
import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import {Link} from 'react-router-dom';
import { Card, Container, Image, Col, Row, Button} from 'react-bootstrap';
import moment from 'moment';

const Movie= props => {
    //console.log("call movie.js");

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []

    }) 


    const getMovie = id =>{
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getMovie(props.match.params.id)
        }, [props.match.params.id])

    const deleteReview = (reviewId, index) => {
       
        MovieDataService.deleteReview(reviewId, props.user.id)
        .then(response => {
            setMovie(prevState => {
                const newReviews = prevState.reviews.filter((_, i) => i !== index);
                return {
                    ...prevState,
                    reviews: newReviews
                };
            });
        })
        .catch(e => {
            console.log(e);
        });

    //     MovieDataService.deleteReview(reviewId, props.user.id)
    //         .then(response => {
    //             setMovie((prevState)=>{
    //                 prevState.reviews.splice(index,1);
    //                 return({
    //                     ...prevState
    //                 })
    //             })
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         })
    }

    return (
        <div className="App">
        <Container>
            <Row>
            <Col>
                <Image src={movie.poster + "/100px250"} fluid />
            </Col>
            <Col>
                <Card>
                <Card.Header as="h5">{movie.title}</Card.Header>
                <Card.Body>
                    <Card.Text>{movie.plot}</Card.Text>
                    {props.user && (
                    <Link to={`/movies/${props.match.params.id}/review`}>
                        Add Review
                    </Link>
                    )}
                </Card.Body>
                </Card>
                <h2>Reviews</h2>
                <br/>
                {movie.reviews.map((review, index) => (
                    <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>
                        {review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY")}
                        </Card.Title>
                        <Card.Text>{review.review}</Card.Text>
                        {props.user && props.user.id === review.user_id && (
                        <Row>
                            <Col>
                            <Link to={{
                                pathname: "/movies/" + props.match.params.id + "/review",
                                state: { currentReview: review }
                            }}>Edit</Link>
                            </Col>
                            <Col>
                            <Button variant="link" onClick={()=>deleteReview(review._id, index)}>Delete</Button>
                            </Col>
                        </Row>
                        )}
                    </Card.Body>
                    </Card>
                ))}
            </Col>
      </Row>
    </Container>
    </div>
    )
};

export default Movie;
