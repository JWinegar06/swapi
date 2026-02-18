import React from "react";
import PlanetViewer from "../Components/PlanetViewer";
import { Container } from "react-bootstrap";

const ViewPlanet = () => {
  return (
    <Container>
      <h2 className="text-center mb-4">Planet Details</h2>
      <PlanetViewer />
    </Container>
  );
};

export default ViewPlanet;
