import React, { useState } from "react";
import PlanetComponent from "../Components/PlanetComponent";
import { Container, Form, FormControl } from "react-bootstrap";

const Planets = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container>
      <h2 className="text-center mb-4">Star Wars Planets</h2>
      <Form className="d-flex mb-4">
        <FormControl
          type="search"
          placeholder="Search Planets"
          className="me-2"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>
      <PlanetComponent searchQuery={searchQuery} />
    </Container>
  );
};

export default Planets;