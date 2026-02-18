import React from "react";
import { Container, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="text-center my-5">
      <h1>Welcome to the Star Wars API Explorer</h1>
      <p className="lead">
        Explore characters and their stories from the Star Wars universe.
      </p>
      <Button href="/Characters" variant="primary" size="lg" className="mt-3">
        View Characters
      </Button>
      <br/>
      <Button href="/Starships" variant="primary" size="lg" className="mt-3">
        View Starships
      </Button>
      <br/>
      <Button href="/Planets" variant="primary" size="lg" className="mt-3">
        View Planets
      </Button>
    </Container>
  );
};

export default Home;
