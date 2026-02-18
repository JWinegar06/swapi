import React, { useEffect, useState } from "react";
import { GetCharacters } from "../API/CharacterAPI";
import { Card, Stack, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const CharacterComponent = ({ searchQuery }) => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  // Fetch characters when the component mounts
  useEffect(() => {
    GetCharacters().then((response) => {
      const characters = response.data.results;
      setCharacters(characters);
      setFilteredCharacters(characters);
    });
  }, []);

  // Filter characters based on the search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(characters);
    }
  }, [searchQuery, characters]);

  return (
    <Container className="my-4">
      <Stack gap={3}>
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character, index) => (
            <Card key={index} className="shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="mb-0">{character.name}</Card.Title>
                  <Card.Text className="text-muted">
                    Character ID: {character.uid}
                  </Card.Text>
                </div>
                <Link
                  to={`/ViewCharacter/${character.uid}`}
                  className="btn btn-outline-primary"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner animation="grow" />
          </Container>
        )}
      </Stack>
    </Container>
  );
};

export default CharacterComponent;
