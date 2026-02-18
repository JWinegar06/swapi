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
    </Container>
  );
};

export default Home;
