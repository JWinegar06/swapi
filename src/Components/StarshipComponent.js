import React, { useEffect, useState } from "react";
import { GetStarships } from "../API/StarshipAPI";
import { Card, Stack, Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const StarshipComponent = ({ searchQuery }) => {
  const [starships, setStarships] = useState([]);
  const [filteredStarships, setFilteredStarships] = useState([]);

  // Fetch starships when the component mounts
  useEffect(() => {
    GetStarships().then((response) => {
      const starships = response.data.results;
      setStarships(starships);
      setFilteredStarships(starships);
    });
  }, []);

  // Filter starships based on the search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = starships.filter((starship) =>
        starship.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredStarships(filtered);
    } else {
      setFilteredStarships(starships);
    }
  }, [searchQuery, starships]);

  return (
    <Container className="my-4">
      <Stack gap={3}>
        {filteredStarships.length > 0 ? (
          filteredStarships.map((starship, index) => (
            <Card key={index} className="shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="mb-0">{starship.name}</Card.Title>
                  <Card.Text className="text-muted">
                    Starship ID: {starship.uid}
                  </Card.Text>
                </div>
                <Link
                  to={`/ViewStarship/${starship.uid}`}
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

export default StarshipComponent;
