import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetStarshipById } from "../API/StarshipAPI";
import { Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { sentenceCase } from "change-case";

const StarshipViewer = () => {
  const { id } = useParams(); // Get starship ID from URL params
  const [starship, setStarship] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch starship data by ID
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    GetStarshipById(id)
      .then((res) => {
        if (!isMounted) return;
        // API shape: res.data.result may be undefined on error
        if (res && res.data && res.data.result) {
          setStarship(res.data.result);
        } else {
          setError("Starship not found");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("GetStarshipById error:", err);
        setError(err.message || "Failed to load starship");
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
      {starship ? (
        <Row>
          {/* Left Column - Starship Details */}
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="display-5 mb-3">
                  {starship.properties.name}
                </Card.Title>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Cargo Capacity:</strong>{" "}
                      {starship.properties.cargo_capacity}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Passengers:</strong>{" "}
                      {starship.properties.passengers}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Max Speed:</strong>{" "}
                      {sentenceCase(starship.properties.max_atmosphering_speed)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Crew:</strong>{" "}
                      {sentenceCase(starship.properties.crew)}
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
                      <strong>Model:</strong>{" "}
                      {sentenceCase(starship.properties.model)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Description:</strong> {starship.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Length:</strong> {starship.properties.length}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : error ? (
        <Container className="my-5">
          <h4 className="text-danger">Error loading starship</h4>
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
          <p>No starship data.</p>
        </Container>
      )}
    </Container>
  );
};

export default StarshipViewer;
