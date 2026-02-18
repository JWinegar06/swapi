import React from "react";
import CharacterViewer from "../Components/CharacterViewer";
import { Container } from "react-bootstrap";

const ViewCharacter = () => {
  return (
    <Container>
      <h2 className="text-center mb-4">Character Details</h2>
      <CharacterViewer />
    </Container>
  );
};

export default ViewCharacter;
