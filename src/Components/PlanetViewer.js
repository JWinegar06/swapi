import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPlanetById } from "../API/PlanetAPI";
import { Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { sentenceCase } from "change-case";

const PlanetViewer = () => {
  const { id } = useParams(); // Get starship ID from URL params
  const [planet, setPlanet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch starship data by ID
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    GetPlanetById(id)
      .then((res) => {
        if (!isMounted) return;
        // API shape: res.data.result may be undefined on error
        if (res && res.data && res.data.result) {
          setPlanet(res.data.result);
        } else {
          setError("Planet not found");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("GetPlanetById error:", err);
        setError(err.message || "Failed to load planet");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <Container className="my-5">
      {planet ? (
        <Row>
          {/* Left Column - planets Details */}
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="display-5 mb-3">
                  {planet.properties.name}
                </Card.Title>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Diameter:</strong> {planet.properties.diameter}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Terrain:</strong> {planet.properties.terrain}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Climate:</strong>{" "}
                      {sentenceCase(planet.properties.climate)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Population:</strong>{" "}
                      {sentenceCase(planet.properties.population)}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
                <Card.Footer className="bg-white">
                  <Card.Link>Add link to planet here</Card.Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Additional Details */}
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Rotation Period:</strong>{" "}
                      {sentenceCase(planet.properties.rotation_period)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Orbital Period:</strong>{" "}
                      {planet.properties.orbital_period}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : error ? (
        <Container className="my-5">
          <h4 className="text-danger">Error loading planet</h4>
          <p>{error}</p>
        </Container>
      ) : loading ? (
        // Loading Spinner
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner animation="grow" />
        </Container>
      ) : (
        <Container>
          <p>No Planet data.</p>
        </Container>
      )}
    </Container>
  );
};

export default PlanetViewer;
