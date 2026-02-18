import React from "react";
import StarshipViewer from "../Components/StarshipViewer";
import { Container } from "react-bootstrap";

const ViewStarship = () => {
  return (
    <Container>
      <h2 className="text-center mb-4">Starship Details</h2>
      <StarshipViewer />
    </Container>
  );
};

export default ViewStarship;
