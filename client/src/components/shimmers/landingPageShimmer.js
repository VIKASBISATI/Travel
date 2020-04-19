import React from "react";
import { Col, Row } from "antd";
import "./shimmers.css";
function LandingPageShimmer(props) {
  let cards = [],
    filters = [],
    i = 0,j=0;
  while (++i <= props.cardsLen) cards.push(i);
  while (++j <= props.filtersLen) filters.push(j);
  const renderCards = cards.map(index => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <div className="card-wrap">
          <div className="generic-skeleton"></div>
        </div>
      </Col>
    );
  });
  const renderFilters = filters.map(index => {
    return (
      <Col lg={12} xs={24} key={index}>
        <div className="collapse-header">
          <div className="generic-skeleton" />
        </div>
      </Col>
    );
  });
  return (
    <div>
      <Row gutter={[16, 16]}>{renderFilters}</Row>
      <Row gutter={[16, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LandingPageShimmer;
