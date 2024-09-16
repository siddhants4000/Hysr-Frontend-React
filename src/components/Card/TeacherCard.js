import React from 'react';
import { Card, ListGroup } from "react-bootstrap";
import "../Card/TeacherCard.css";

function TeacherCard({ data = [], onApprove, onCancel, onRemove, showApprove = false, showCancel = false, showRemove = false }) {
  return (
    <div className='teacherCard-container'>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className='teacherCardBody'>
            <Card className='teacherCardOverall'>
              <Card.Img variant="top" src={item.image} className='teacherCardImage' />
              <Card.Body>
                <Card.Title className='teacher-button-container'>{item.username}</Card.Title>
                <Card.Text>Name: {item.name}</Card.Text>
                <Card.Text>Gender: {item.learnerGender}</Card.Text>
                <Card.Text>Age: {item.learnerAge}</Card.Text>
                <Card.Text>Mode Of Instruction: {item.modeOfLearning}</Card.Text>
                <Card.Text>Type Of Learning: {item.typeOfLearning}</Card.Text>
                <Card.Text>Level Of Skill: {item.levelOfSkill}</Card.Text>
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
              <Card.Body className='teacher-button-container'>
                {/* Render the links */}
                {item.links && item.links.length > 0 ? (
                  item.links.map((link, idx) => {
                    if (link.text === 'Approve' && showApprove) {
                      return (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            onApprove(item.username);
                          }}
                          className='teacher-button-link'
                        >
                          {link.text}
                        </button>
                      );
                    } else if (link.text === 'Cancel' && showCancel) {
                      return (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            onCancel(item.username);
                          }}
                          className='teacher-button-link'
                        >
                          {link.text}
                        </button>
                      );
                    } else if (link.text === 'Remove' && showRemove) {
                      return (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            onRemove(item.username);
                          }}
                          className='teacher-button-link'
                        >
                          {link.text}
                        </button>
                      );
                    } else {
                      return (
                        <Card.Link 
                          key={idx} 
                          href={link.href} // Link to teacher profile
                          className='teacher-button-link'
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

export default TeacherCard;
