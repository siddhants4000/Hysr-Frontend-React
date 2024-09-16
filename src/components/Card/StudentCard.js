import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import "../Card/StudentCard.css";

function StudentCard({ data = [], onCancel, onRemove, onConnect, showCancel = false, showRemove = false }) {
  return (
    <div className='studentCard-container'>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className='studentCardBody'>
            <Card className='studentCardOverall'>
              <Card.Img variant="top" src={item.image} className='studentCardImage' />
              <Card.Body>
                <Card.Title className='student-button-container'>{item.username}</Card.Title>
                <Card.Text>
                  Name: {item.name}
                </Card.Text>
                <Card.Text></Card.Text>
                <Card.Text>
                  Gender: {item.gender}
                </Card.Text>
                <Card.Text>
                  Mode Of Instruction: {item.modeOfInstruction}
                </Card.Text>
                <Card.Text>
                  Price Range: {item.priceRange}
                </Card.Text>
                <Card.Text>
                  Years Of Experience: {item.experience}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                Items Taught:
                {item.listItems && item.listItems.length > 0 ? (
                  item.listItems.map((listItem, idx) => (
                    <ListGroup.Item key={idx}>{listItem}</ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No items listed</ListGroup.Item>
                )}
              </ListGroup>
              <Card.Body className='student-button-container'>
                {/* Render the links */}
                {item.links && item.links.length > 0 ? (
                  item.links.map((link, idx) => {
                    if (link.text === 'Cancel' && showCancel) {
                      return (
                        <Card.Link 
                          key={idx}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent link navigation
                            onCancel(item.username); // Call the handleCancel function
                          }}
                          className='student-button-link'
                        >
                          {link.text}
                        </Card.Link>
                      );
                    } else if (link.text === 'Remove' && showRemove) {
                      return (
                        <Card.Link 
                          key={idx}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent link navigation
                            onRemove(item.username); // Call the handleRemove function
                          }}
                          className='student-button-link'
                        >
                          {link.text}
                        </Card.Link>
                      );
                    } else if (link.text === 'Connect') {
                      return (
                        <Card.Link 
                          key={idx}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent link navigation
                            onConnect(item.username); // Call the handleConnect function
                          }}
                          className='student-button-link'
                        >
                          {link.text}
                        </Card.Link>
                      );
                    } else {
                      return (
                        <Card.Link 
                          key={idx} 
                          href={link.href} // Link to teacher profile
                          className='student-button-link'
                        >
                          {link.text}
                        </Card.Link>
                      );
                    }
                  })
                ) : (
                  <p>No links available</p>
                )}
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default StudentCard;
