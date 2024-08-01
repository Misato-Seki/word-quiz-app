import React from "react";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/Home.css';
import wordquiz from '../images/word-quiz.jpg'
import dataeditor from '../images/data-editor.jpg'

function Home() {
  return (
    <div className="home">
      <Row xs={1} md={2} className="g-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={wordquiz} />
            <Card.Body>
              <Card.Link href="/wordquiz">Word Quiz</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={dataeditor} />
            <Card.Body>
              <Card.Link href="/dataeditor">Data Editor</Card.Link>
            </Card.Body>
          </Card>
        </Col>
    </Row>

    <p>Image by <a href="https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1850170">Pexels</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1850170">Pixabay</a></p>
    </div>
  );
}

export default Home;
