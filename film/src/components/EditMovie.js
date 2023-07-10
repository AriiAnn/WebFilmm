import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Container, Card, Row, Button, Col, Image } from "react-bootstrap";
import moment from "moment";
const EditFilm = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/films");
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDeletePlatform = (id) => {
    axios.delete(`http://localhost:3000/films/${id}`).then((response) => {
      console.log("Data deleted:", response.data);
      fetchMovies();
    });
  };

  return (
    <div className="editMovie EditFilm">
      <Container id="EditFilm">
        <br />
        <h1 className="text-white">FILMS</h1>
        <br />
        <Row>
          {movies.map((movie) => (
            <Col md={4} className="movieWrapper" key={movie.id}>
              <Card className="movieImage">
                <Image src={movie.url} alt={movie.title} className="images" />
                <div className="bg-dark">
                  <div className="p-2 m-1 text-white">
                    <Card.Title className="text-center">{movie.title}</Card.Title>
                    <Card.Text className="text-left">{movie.description}</Card.Text>
                    <Card.Text className="text-left">TAYANG {moment(movie.createdAt).format("DD-MM-YYYY")}</Card.Text>
                    <div className="card-footer">
                      <Button onClick={() => handleDeletePlatform(movie.id)} className="btn btn-danger">
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          window.location.href = `/film/editlagi/${movie.id}`;
                        }}
                      >
                        edit
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default EditFilm;
