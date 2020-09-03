import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";


export default function NominationListCard({item, share, handleDelete}) {
  return (
    <Card small noPadding key={item?.imdbID} >
    <Row className="individual-nomination-card">
      <Col xs={4} className="nomination-details-container">
        <img
          className="nomination-poster"
          src={item?.Poster}
          alt="sad face"
          width="70%"
          height="80%"
        />
      </Col>
      <Col className="nomination-details-container" >
        <Row className="nomination-title">{item?.Title}</Row>
        <Row className="nomination-details">{item?.Year}</Row>
      </Col>
      <Col className="nomination-details-container">
      <Row className="nomination-buttons-container">
        {share ?  
            
          <a href={`https://www.imdb.com/title/${item?.imdbID}`} target="_blank">
          <button
            className="movie-button"
            style={{ marginLeft: "0.7em" }}
          >
            Details
          </button>
          </a>
        :   
          <button
            className="nomination-button"
            style={{ marginLeft: "0.7em" }}
            onClick={()=>handleDelete(item?.imdbID)}
          >
            Delete
          </button>
        }
        </Row>
      </Col>
    </Row>
  </Card>
  )
}
