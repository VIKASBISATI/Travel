import React from "react";
import { Col, Row } from "antd";
import "./shimmers.css";
function LandingPageShimmer(props) {
  console.log("tpye", props.len);
  console.log("type of", typeof props.len);
  let cards = [],
    i = 0;
  while (++i <= props.len) cards.push(i);
  const renderCards = cards.map(index => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <div class="card-wrap">
          <div class="inner-card"></div>
        </div>
      </Col>
    );
  });
  return (
    <div>
      <Row gutter={[16, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LandingPageShimmer;
