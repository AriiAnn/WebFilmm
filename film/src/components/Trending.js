import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Container, Card, Row, Button, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const Trending = () => {
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

  return (
    <div className="trending ">
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand href="/">UASFILM</Navbar.Brand>
          <Nav>
            <Link to="/add" href="#addfilm">
              ADD MOVIE
            </Link>
            <Link to="/edit">EDIT MOVIE</Link>
            <Nav.Link href="#film">KUMPULAN FILM</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="intro text-white text-center d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <div className="title">NONTON GRATIS</div>
            <div className="title">GAK PAKE KARCIS</div>
            <div className="introButton mt-4 text-center">
              <Button variant="dark">Lihat Semua List</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container id="film">
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

export default Trending;
